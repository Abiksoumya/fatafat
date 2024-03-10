import mongoose, { Schema, Document } from 'mongoose';

// Define interface for User document
interface UserDocument extends Document {
  name?: string;
  userId: string;
  createdAt: Date;
  role: string;
  margin: number;
  ntp: number;
  isActive: boolean;
  createdBy: string;
  password: string;
  balance: number;
  transaction: string[]; // Assuming these are references to transaction document IDs
    otherTransaction: string[]; // Assuming these are references to transaction document IDs
    bets: string[]; // Assuming these are references to PointBets document IDs
    pattiBets: string[]; // Assuming these are references to PattiBets document IDs
    ntpHistory: string[]; 
}


const userSchema: Schema<UserDocument> = new Schema({
    name: String,
    userId: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
    role: String,
    margin: Number,
    ntp: Number,
    isActive: { type: Boolean, default: true },
    createdBy: String,
    password: String,
    balance: { type: Number, default: 0 },
    transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    otherTransaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    bets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PointBets' }],
    pattiBets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PattiBets' }],
    ntpHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NtpHistory' }]
  });


const User = mongoose.model<UserDocument>('User', userSchema);

export {
  UserDocument,
  User

} 