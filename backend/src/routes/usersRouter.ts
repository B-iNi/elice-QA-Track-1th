import { Request, Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import moment from "moment";

import User, { IUser } from "../models/user.model";
import loginRequired from "../middlewares/loginRequired";
import Schedule from "../models/schedule.model";

const usersRouter = Router();

usersRouter.post("/signup", async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password || !passwordConfirm) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = new RegExp(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (!emailRegex.test(email))
    return res
      .status(400)
      .json({ message: "Email is not formatted correctly" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "User already exists" });

  await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({ message: "You have successfully signed up" });
});

usersRouter.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    {
      session: false,
    },
    (err: Error | null, user: IUser, info: { message: string }) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (!user) return res.status(401).json({ message: info.message });

      const { _id } = user;
      const payload = { _id };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET as string);

      res.cookie("token", token);
      return res
        .status(200)
        .json({ message: "You have successfully logged in" });
    }
  )(req, res, next);
});

usersRouter.get("/", loginRequired, async (req, res) => {
  try {
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });

    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const { search } = req.query;

    let users;

    if (search)
      users = await User.find({
        username: {
          $regex: search,
          $options: "i", // 대소문자 구분 없이 검색
        },
      })
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(size * (page - 1))
        .limit(size);
    else
      users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(size * (page - 1))
        .limit(size);

    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    else res.status(500);
  }
});

usersRouter.get("/me", loginRequired, async (req, res) => {
  try {
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });

    return res.status(200).json(req.user);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    else res.status(500);
  }
});

usersRouter.get(
  "/:userId",
  loginRequired,
  async (req: Request<{ userId: string }, {}, {}>, res) => {
    try {
      if (!req.user) return res.status(403).json({ message: "Unauthorized" });
      const { userId } = req.params;
      const foundUser = await User.findById(userId).select("-password");
      if (!foundUser)
        return res.status(404).json({ message: "User not found" });

      res.setHeader("Cache-Control", "no-store");

      return res.status(200).json(foundUser);
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message });
      else res.status(500);
    }
  }
);

usersRouter.get(
  "/:userId/schedules",
  loginRequired,
  async (
    req: Request<
      { userId: string },
      {},
      {},
      { startDate: string; endDate: string }
    >,
    res
  ) => {
    // 로그인 여부 검사
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });

    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    // startDate, endDate 날짜 형식 유효성 검사
    const startDateInstance = moment(startDate);
    const endDateInstance = moment(endDate);
    if (!startDateInstance.isValid() || !endDateInstance.isValid())
      return res.status(400).json({ message: "Invalid date format" });

    try {
      // 유저 조회
      const foundUser = await User.findById(userId);
      if (!foundUser)
        return res.status(404).json({ message: "User not found" });

      // 기간 내 유저가 참가자인 일정 조회
      const foundParticipantSchedules = await Schedule.find({
        participants: foundUser,
      }).populate({ path: "participants", select: "-password" });

      // 기간 내 유저가 소유자인 일정 조회
      const foundOwnerSchedules = await Schedule.find({
        owner: foundUser,
      }).populate({ path: "participants", select: "-password" });

      const foundSchedules = [...foundParticipantSchedules, ...foundOwnerSchedules]
      .filter((schedule) => {
        const scheduleStartsAt = moment(schedule.startsAt);
        const scheduleEndsAt = moment(schedule.endsAt);
        return (
          (scheduleStartsAt >= startDateInstance &&
            scheduleStartsAt <= endDateInstance) ||
          (scheduleEndsAt >= startDateInstance &&
            scheduleEndsAt <= endDateInstance)
        );
      });

      return res
        .status(200)
        .json(foundSchedules);
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message });
      else res.status(500);
    }
  }
);

export default usersRouter;
