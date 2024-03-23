import mongoose, { Schema, Document, Types } from 'mongoose';
import { User,UserDocument } from './user.modelr';

// Define interface for NtpHistory document
interface ReportHistoryDocument extends Document {
  userId: string;
  userName: string;
  ntp: number;
  patti: number;
  betPoint: number;
  winPoint: number;
  timestamp: Date;
  date: string;
  user:Types.ObjectId
}

// Define NtpHistory schema
const reportHistorySchema: Schema<ReportHistoryDocument> = new Schema({
  userId: String,
  userName: String,
  ntp: Number,
  patti: Number,
  betPoint: Number,
  winPoint: Number,
  date:{ type: String, default: () => new Date().toISOString().split('T')[0] },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

// Define NtpHistory model
const ReportHistory = mongoose.model<ReportHistoryDocument>('ReportHistory', reportHistorySchema);

export default ReportHistory;
