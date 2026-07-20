import mongoose from 'mongoose';
import { ActivityModel, LeaderboardEntryModel, TeamModel, UserModel, WorkoutModel } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    await TeamModel.insertMany([
      { name: 'Octo Sprinters', mascot: 'Rocket Octocat', city: 'San Francisco', memberCount: 4 },
      { name: 'Data Dashers', mascot: 'Circuit Octocat', city: 'Seattle', memberCount: 3 },
      { name: 'Branch Lifters', mascot: 'Barbell Octocat', city: 'Austin', memberCount: 3 },
    ]);

    await UserModel.insertMany([
      { name: 'Mona Rivera', email: 'mona.rivera@example.com', age: 29, team: 'Octo Sprinters', role: 'Runner' },
      { name: 'Kai Chen', email: 'kai.chen@example.com', age: 34, team: 'Data Dashers', role: 'Cyclist' },
      { name: 'Avery Johnson', email: 'avery.johnson@example.com', age: 26, team: 'Branch Lifters', role: 'Strength Coach' },
      { name: 'Sam Patel', email: 'sam.patel@example.com', age: 31, team: 'Octo Sprinters', role: 'Yoga Lead' },
      { name: 'Jordan Kim', email: 'jordan.kim@example.com', age: 38, team: 'Branch Lifters', role: 'Rowing Specialist' },
    ]);

    await ActivityModel.insertMany([
      { userEmail: 'mona.rivera@example.com', type: 'Trail Run', durationMinutes: 48, caloriesBurned: 520, activityDate: new Date('2026-07-13T07:30:00Z') },
      { userEmail: 'kai.chen@example.com', type: 'Indoor Cycling', durationMinutes: 60, caloriesBurned: 640, activityDate: new Date('2026-07-14T18:00:00Z') },
      { userEmail: 'avery.johnson@example.com', type: 'Strength Training', durationMinutes: 55, caloriesBurned: 430, activityDate: new Date('2026-07-15T12:15:00Z') },
      { userEmail: 'sam.patel@example.com', type: 'Power Yoga', durationMinutes: 45, caloriesBurned: 280, activityDate: new Date('2026-07-16T06:45:00Z') },
      { userEmail: 'jordan.kim@example.com', type: 'Rowing Intervals', durationMinutes: 40, caloriesBurned: 500, activityDate: new Date('2026-07-17T17:20:00Z') },
    ]);

    await LeaderboardEntryModel.insertMany([
      { userEmail: 'kai.chen@example.com', rank: 1, points: 1840, weeklyStreak: 6 },
      { userEmail: 'mona.rivera@example.com', rank: 2, points: 1715, weeklyStreak: 5 },
      { userEmail: 'jordan.kim@example.com', rank: 3, points: 1640, weeklyStreak: 4 },
      { userEmail: 'avery.johnson@example.com', rank: 4, points: 1525, weeklyStreak: 4 },
      { userEmail: 'sam.patel@example.com', rank: 5, points: 1380, weeklyStreak: 3 },
    ]);

    await WorkoutModel.insertMany([
      { name: 'Morning Mobility Flow', focusArea: 'Flexibility', difficulty: 'Beginner', durationMinutes: 20, suggestedFor: 'Recovery days and desk-heavy schedules' },
      { name: '5K Pace Builder', focusArea: 'Cardio', difficulty: 'Intermediate', durationMinutes: 35, suggestedFor: 'Runners improving sustained pace' },
      { name: 'Full Body Strength Circuit', focusArea: 'Strength', difficulty: 'Intermediate', durationMinutes: 45, suggestedFor: 'Athletes building balanced power' },
      { name: 'Cycling Climb Simulation', focusArea: 'Endurance', difficulty: 'Advanced', durationMinutes: 50, suggestedFor: 'Cyclists training for hills' },
      { name: 'Core Stability Reset', focusArea: 'Core', difficulty: 'Beginner', durationMinutes: 25, suggestedFor: 'Posture and injury prevention' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
