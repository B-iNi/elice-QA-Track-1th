import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    export interface User extends Omit<IUser, "password"> {}
  }
}
