import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface ISchedule extends Document<mongoose.Types.ObjectId> {
  title: string;
  description: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
  owner: IUser;
  participants: IUser[];
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    location: String,
    startsAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    endsAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);

export default Schedule;
