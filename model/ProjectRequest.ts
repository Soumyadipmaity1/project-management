import mongoose, { Schema, Model, Document } from "mongoose";

export interface Request extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  domain: string[];
  status: "Pending" | "Approved" | "Rejected";
  description: string;
  link?: string;
  projectlead?: mongoose.Types.ObjectId; // renamed from projectlead
  colead?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema: Schema<Request> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    link: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // optional
          return String(v).trim().length >= 7;
        },
        message: "Link must be at least 7 characters long",
      },
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    domain: {
      type: [String],
      required: true,
      validate: [
        {
          validator: (v: string[]) => v.length >= 1 && v.length <= 3,
          message: "You must provide between 1 and 3 domains.",
        },
      ],
    },
    projectlead: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    colead: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// keep teamlead and projectlead in sync for backward compatibility
RequestSchema.pre("save", function (next) {
  // @ts-ignore
  if (this.teamlead && !this.projectlead) {
    // @ts-ignore
    this.projectlead = this.teamlead;
  }
  // @ts-ignore
  if (this.projectlead && !this.teamlead) {
    // @ts-ignore
    this.teamlead = this.projectlead;
  }
  next();
});

// avoid model overwrite issues in dev/hot-reload
if (mongoose.models && mongoose.models.Request) {
  delete mongoose.models.Request;
}
const RequestModel: Model<Request> =
  mongoose.models.Request || mongoose.model<Request>("Request", RequestSchema);

export default RequestModel;
