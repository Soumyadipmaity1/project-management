import mongoose, {Schema,Document, mongo} from "mongoose";

export interface Announcement extends Document {
  sender: mongoose.Types.ObjectId; // reference User
  content: string;
  pinned: boolean;
  createdAt: Date;
}

const AnnouncementSchema: Schema<Announcement> = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    pinned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AnnouncementModel =
  (mongoose.models.Announcement as mongoose.Model<Announcement>) ||
  mongoose.model<Announcement>("Announcement", AnnouncementSchema);

export default AnnouncementModel;
