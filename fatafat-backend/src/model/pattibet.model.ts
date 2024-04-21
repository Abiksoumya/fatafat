import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Define interface for PattiBet document
interface IPattiBet extends Document {
  ticketNo: string;
  userId: string;
  patti: string;
  betPoint: number;
  winBetPoint: number;
  isActive: boolean;
  slot: number;
  reward: number;
  date: string;
  createdBy: string;
  timestamp: Date;
  status: string;
  user: Types.ObjectId;
}

// Define PattiBet schema
const pattiBetSchema: Schema<IPattiBet> = new Schema({
  ticketNo: String,
  userId: String,
  patti: String,
  betPoint: Number,
  winBetPoint: Number,
  isActive: Boolean,
  slot: Number,
  reward: { type: Number, default: 0 },
  date: String,
  createdBy: String,
  timestamp: { type: Date, default: Date.now },
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Define PattiBet model
const PattiBet: Model<IPattiBet> = mongoose.model("PattiBet", pattiBetSchema);

export default PattiBet;
