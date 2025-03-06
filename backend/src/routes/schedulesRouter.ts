import { Request, Router } from "express";

import User, { IUser } from "../models/user.model";
import Schedule from "../models/schedule.model";

import moment from "moment";

const schedulesRouter = Router();

interface ScheduleRequestBody {
  title: string;
  description?: string;
  location?: string;
  startsAt: string;
  endsAt: string;
  participantIds?: string[];
}

schedulesRouter.post(
  "/",
  async (req: Request<{}, {}, ScheduleRequestBody>, res) => {
    // 로그인 여부 검사
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });
    const { _id: owner } = req.user;
    const { title, description, location, startsAt, endsAt, participantIds } =
      req.body;

    // Body 필드 존재 여부 검사
    if (!title || !startsAt || !endsAt)
      return res.status(400).json({ message: "All fields are required" });

    if (moment(startsAt) >= moment(endsAt))
      return res
        .status(400)
        .json({ message: "startsAt cannot be later than endsAt" });

    try {
      // 일정 생성
      const newSchedule = new Schedule({
        title,
        description,
        location,
        startsAt,
        endsAt,
        owner,
      });

      // 참가자 필드 유효성 검사 및 참가자 생성
      let participantList: IUser[] = [];
      if (participantIds && participantIds.length > 0)
        for (const userId of participantIds) {
          const user = await User.findById(userId);
          if (!user)
            return res
              .status(400)
              .json({ message: "One of Participants ID is invalid" });
          participantList.push(user);
        }

      // 참가자 추가 이후 생성된 일정 반영
      newSchedule.participants = participantList;
      console.log("post schedule: participants");
      const savedSchedule = await (
        await newSchedule.save()
      ).populate({ path: "participants", select: "-password" });

      return res.status(201).json(savedSchedule.toObject());
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message });
      else res.status(500);
    }
  }
);

schedulesRouter.get(
  "/:scheduleId",

  async (req: Request<{ scheduleId: string }, {}, {}>, res) => {
    // 로그인 여부 검사
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });
    const { scheduleId } = req.params;

    try {
      // 일정 조회
      const foundSchedule = await Schedule.findById(scheduleId)
        .populate({ path: "participants", select: "-password" })
        .populate({ path: "owner", select: "-password" });
      if (!foundSchedule)
        return res.status(404).json({ message: "Schedule not found" });

      return res.status(200).json(foundSchedule.toObject());
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message });
      else res.status(500);
    }
  }
);

schedulesRouter.put(
  "/:scheduleId",

  async (
    req: Request<{ scheduleId: string }, {}, ScheduleRequestBody>,
    res
  ) => {
    // 로그인 여부 검사
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });
    const { _id: putterId } = req.user;

    const { title, description, location, startsAt, endsAt, participantIds } =
      req.body;

    // Body 필드 존재 여부 검사
    if (!title || !startsAt || !endsAt)
      return res.status(400).json({ message: "All fields are required" });

    if (moment(startsAt) >= moment(endsAt))
      return res
        .status(400)
        .json({ message: "startsAt cannot be later than endsAt" });

    const { scheduleId } = req.params;

    try {
      // 업데이트 할 일정 조회
      const foundSchedule = await Schedule.findById(scheduleId);
      if (!foundSchedule)
        return res.status(404).json({ message: "Schedule not found" });

      // 일정 소유자와 로그인 된 유저 동일한지 확인
      if (!foundSchedule.owner._id?.equals(putterId))
        return res
          .status(400)
          .json({ message: "Only owner can update this schedule" });
      const foundScheduleWithParticipant = await foundSchedule.populate({
        path: "participants",
      });

      // 참가자 필드 유효성 검사 및 수정
      let participantList: IUser[] = [];
      if (participantIds && participantIds.length > 0)
        for (const userId of participantIds) {
          const user = await User.findById(userId);
          if (!user)
            return res
              .status(400)
              .json({ message: "One of Participants ID is invalid" });
          participantList.push(user);
        }

      // 일정 업데이트
      await foundSchedule.updateOne({
        title,
        description,
        location,
        startsAt,
        endsAt,
        participants: participantList,
      });
      const updatedFoundSchedule = await Schedule.findById(scheduleId);
      if (!updatedFoundSchedule)
        return res
          .status(500)
          .json({ message: "Something went wrong while updating DB" });
      const updatedSchedule = await updatedFoundSchedule.populate({ path: "participants", select: "-password" });

      return res.status(200).json(updatedSchedule.toObject());
    } catch (err) {
      console.log(err);
      if (err instanceof Error) res.status(500).json({ message: err.message });
      else res.status(500);
    }
  }
);

schedulesRouter.delete(
  "/:scheduleId",

  async (req: Request<{ scheduleId: string }, {}, {}>, res) => {
    // 로그인 여부 검사
    if (!req.user) return res.status(403).json({ message: "Unauthorized" });
    const { _id: deleterId } = req.user;

    const { scheduleId } = req.params;

    try {
      // 삭제할 일정 조회
      const foundSchedule = await Schedule.findById(scheduleId);
      if (!foundSchedule)
        return res.status(404).json({ message: "Schedule not found" });

      // 일정 소유자와 로그인 된 유저 동일한지 확인
      if (!foundSchedule.owner._id?.equals(deleterId))
        return res
          .status(400)
          .json({ message: "Only owner can delete this schedule" });

      await foundSchedule.deleteOne();

      const deletedSchedule = await foundSchedule.populate({ path: "participants", select: "-password" });
      return res.status(200).json(deletedSchedule.toObject());
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message });
      else res.status(500);
    }
  }
);

export default schedulesRouter;
