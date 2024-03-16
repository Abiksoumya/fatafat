import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define interface for PointBet document
interface IPointBet extends Document {
  ticketNo: string;
  userId: string;
  point: number;
  betPoint: number;
  isActive: boolean;
  slot: number;
  reward: number;
  timestamp: Date;
  status: string;
  user:Types.ObjectId
}

// Define PointBet schema
const pointBetSchema: Schema<IPointBet> = new Schema({
  ticketNo: String,
  userId: String,
  point: Number,
  betPoint: Number,
  isActive: Boolean,
  reward: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  status: String,
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Define PointBet model
const PointBet: Model<IPointBet> = mongoose.model('PointBet', pointBetSchema);

export default PointBet;
