import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import User from "../models/user.model";
import passport from "passport";
import bcrypt from "bcrypt";

const config: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  session: false,
};

passport.use(
  "local",
  new LocalStrategy(config, async function (email, password, done) {
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser)
        return done(null, false, {
          message: "User not found",
        });

      const compareResult = await bcrypt.compare(password, foundUser.password);
      if (!compareResult)
        return done(null, false, {
          message: "Incorrect password.",
        });

      done(null, foundUser);
    } catch (err) {
      done(err, false);
    }
  })
);

const jwtOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: (req) => {
    let token = null;
    if (req && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    return token;
  },
  secretOrKey: process.env.TOKEN_SECRET as string,
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (user, done) => {
    const foundUser = await User.findById(user._id);
    if (!foundUser) return;
    const { password, ...rest } = foundUser.toObject();
    done(null, { ...rest });
  })
);