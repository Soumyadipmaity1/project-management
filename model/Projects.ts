import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  github?: string;
  liveDemo?: string;
  title: string;
  description: string;
  domain: string[];
  badge: "active" | "completed" | "disabled" | "available";
  projectlead: mongoose.Types.ObjectId;
  image: string;
  colead?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  membersCount: number;
  enrolled?: boolean;
  approved: boolean;
  startDate?: Date;
  completionDate?: Date;
  requests: {
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Rejected";
    createdAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    github: {
      type: String,
      trim: true,
      validate: {
        validator(v: string) {
          if (!v) return true;
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: "GitHub must be a valid URL",
      },
    },
    liveDemo: {
      type: String,
      trim: true,
      validate: {
        validator(v: string) {
          if (!v) return true;
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: "Live Demo must be a valid URL",
      },
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
      trim: true,
    },
    domain: {
      type: [String],
      required: true,
      validate: [(arr: string[]) => arr.length > 0, "At least one domain required"],
    },
    badge: {
      type: String,
      enum: ["active", "completed", "disabled", "available"],
      default: "active",
    },
    projectlead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    colead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    membersCount: {
      type: Number,
      default: 1,
      min: [1, "Members count must be at least 1"],
    },
    enrolled: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    startDate: { type: Date, default: Date.now },
    completionDate: {
      type: Date,
      validate: {
        validator(this: IProject, v: Date) {
          if (!v) return true;
          if (!this.startDate) return true;
          return v >= this.startDate;
        },
        message: "Completion date must be after the start date",
      },
    },
    image: {
      type: String,
      validate: {
        validator(v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v) || v.startsWith("/uploads/");
        },
        message: "Image must be a valid URL",
      },
    },
    requests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

ProjectSchema.pre("save", function (next) {
  this.membersCount = this.members ? this.members.length || 1 : 1;
  next();
});

// ✅ The safest universal Mongoose model declaration pattern
const ProjectModel: Model<IProject> =
  mongoose.models?.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
