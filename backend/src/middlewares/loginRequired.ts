import { NextFunction, Request, Response } from "express";

function loginRequired(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  next();
}

export default loginRequired;
