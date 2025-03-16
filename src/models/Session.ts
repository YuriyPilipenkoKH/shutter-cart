import mongoose, { Document, model, models, Schema } from "mongoose";


export interface ISession extends Document {
  sessionToken: string;
  userId: mongoose.Types.ObjectId;
  expires: Date;
}
const sessionSchema = new Schema<ISession>(
  {
    sessionToken: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

// 🔹 Session Model
const Session = models.Session || model<ISession>("Session", sessionSchema);

export default Session;