import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

import { swaggerUi, specs } from "./swagger";
import usersRouter from "./routes/usersRouter";
import schedulesRouter from "./routes/schedulesRouter";
import loginRequired from "./middlewares/loginRequired";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
); // CORS 설정 추가
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.use((req, res, next) => {
  if (!req.cookies["token"]) {
    next();
    return;
  }
  
  passport.authenticate("jwt", { session: false })(req, res, next);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/users", usersRouter);
app.use("/api/schedules", loginRequired, schedulesRouter);

app.get('/test', (req, res) => {
  console.log("Inside /test route handler");
  res.send('Test route is working!');
});

export default app;
