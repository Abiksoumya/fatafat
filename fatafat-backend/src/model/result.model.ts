import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define interface for Result document
interface IResult extends Document {
  timestamp: Date;
  winSinglePatti: number;
  winThreePatti: number;
  slot: String;
  user:Types.ObjectId
}

// Define Result schema
const resultSchema: Schema<IResult> = new Schema({
  timestamp: { type: Date, default: Date.now },
  winSinglePatti: Number,
  winThreePatti: Number,
  slot: { type: String, required: true },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

// Define Result model
const Result: Model<IResult> = mongoose.model('Result', resultSchema);

export default Result;
