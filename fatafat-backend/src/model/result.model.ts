import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define interface for Result document
interface IResult extends Document {
  timestamp: Date;
  winNumber: number;
  winPatti: number;
  slot: number;
  user:Types.ObjectId
}

// Define Result schema
const resultSchema: Schema<IResult> = new Schema({
  timestamp: { type: Date, default: Date.now },
  winNumber: Number,
  winPatti: Number,
  slot: Number,
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

// Define Result model
const Result: Model<IResult> = mongoose.model('Result', resultSchema);

export default Result;
