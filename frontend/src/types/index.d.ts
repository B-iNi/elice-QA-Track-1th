export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Schedule {
  _id: string;
  title: string;
  description: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
  owner: User;
  participants: User[];
}

export interface ScheduleInfo {
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleRequestBody {
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  participantIds: string[];
}