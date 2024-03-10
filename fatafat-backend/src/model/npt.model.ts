import mongoose, { Schema, Document, Types } from 'mongoose';
import { User,UserDocument } from './user.modelr';

// Define interface for NtpHistory document
interface NtpHistoryDocument extends Document {
  userId: string;
  ntp: number;
  timestamp: Date;
  userIds:Types.ObjectId
}

// Define NtpHistory schema
const ntpHistorySchema: Schema<NtpHistoryDocument> = new Schema({
  userId: String,
  ntp: Number,
  timestamp: { type: Date, default: Date.now },
  userIds: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

// Define NtpHistory model
const NtpHistory = mongoose.model<NtpHistoryDocument>('NtpHistory', ntpHistorySchema);

export default NtpHistory;
