import mongoose, { Schema, Document, Types } from "mongoose";

export interface MemberRequest extends Document {
  user: Types.ObjectId;          
  project: Types.ObjectId;       
  message?: string;              
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
}

const MemberRequestSchema = new Schema<MemberRequest>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MemberRequestModel =
  mongoose.models.MemberRequest ||
  mongoose.model<MemberRequest>("MemberRequest", MemberRequestSchema);

export default MemberRequestModel;
