
import mongoose, { Schema, Document } from "mongoose";

export interface Announcement extends Document {
  _id: mongoose.Types.ObjectId;   
  senderName: string;
  senderProfilePic: string;
  content: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId;
}

const AnnouncementSchema: Schema<Announcement> = new Schema(
  {
    senderName: {
      type: String,
      required: [true, "Sender name is required"],
      trim: true,
    },
    senderProfilePic: {
      type: String,
      required: [true, "Sender profile picture is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

AnnouncementSchema.index({ pinned: -1, createdAt: -1 });

const AnnouncementModel =
  (mongoose.models.Announcement as mongoose.Model<Announcement>) ||
  mongoose.model<Announcement>("Announcement", AnnouncementSchema);

export default AnnouncementModel;
