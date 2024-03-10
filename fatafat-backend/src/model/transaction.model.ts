import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define interface for Transaction document
interface ITransaction extends Document {
  userId: string;
  otherId: string;
  point: number;
  type: string;
  balance: number;
  timestamp: Date;
  user:Types.ObjectId
  otherUser:Types.ObjectId
}

// Define Transaction schema
const transactionSchema: Schema<ITransaction> = new Schema({
  userId: String,
  otherId: String,
  point: Number,
  type: String,
  balance: Number,
  timestamp: { type: Date, default: Date.now },
  otherUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Define a reference to User model for user
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Define Transaction model
const Transaction: Model<ITransaction> = mongoose.model('Transaction', transactionSchema);

export default Transaction;
