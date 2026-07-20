"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionString = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose_1.default.connection;
async function connectDatabase() {
    if (db.readyState === 1) {
        return db;
    }
    await mongoose_1.default.connect(exports.connectionString);
    console.log('Connected to octofit_db');
    return db;
}
db.on('error', console.error.bind(console, 'connection error:'));
exports.default = db;
