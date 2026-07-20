import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  age: number;
  team: string;
  role: string;
}

export interface Team {
  name: string;
  mascot: string;
  city: string;
  memberCount: number;
}

export interface Activity {
  userEmail: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

export interface LeaderboardEntry {
  userEmail: string;
  rank: number;
  points: number;
  weeklyStreak: number;
}

export interface Workout {
  name: string;
  focusArea: string;
  difficulty: string;
  durationMinutes: number;
  suggestedFor: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    userEmail: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    userEmail: { type: String, required: true, unique: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    weeklyStreak: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<User>('User', userSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = mongoose.model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);
