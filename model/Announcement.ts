import mongoose, { Schema, Model, Document } from "mongoose";

export interface Announcement extends Document {
  _id: mongoose.Types.ObjectId;
  senderName?: string;
  senderProfilePic?: string;
  title: string;
  content: string;
  pinned: boolean;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<Announcement>(
  {
    senderName: { type: String, trim: true },
    senderProfilePic: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    pinned: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

AnnouncementSchema.index({ pinned: -1, createdAt: -1 });

const AnnouncementModel: Model<Announcement> =
  mongoose.models.Announcement ||
  mongoose.model<Announcement>("Announcement", AnnouncementSchema);

export default AnnouncementModel;
