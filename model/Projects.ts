import mongoose,  {Schema , Model ,Document } from "mongoose";

export interface Project extends Document {
    title: string;
    description: string;
    domain: string;
    badge: "active" | "completed" | "disabled";
    teamlead: mongoose.Types.ObjectId;
    colead?: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[]; 
    membersCount: number;
    approved: boolean;
    requests: {
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Rejected";
  }[];
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema: Schema<Project> = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim:  true,
    },
    description:{
        type: String,
        required: [true, "Project description is required"],
        trim:  true,
    },
    domain: {
        type: String,
        required: [true, "Domain is required"],
        trim: true,
    },
    badge: {
        type: String,
        enum: ["active", "completed", "disabled"],
        default: "active",
    },
  teamlead: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true,
   },
  colead: {
  type: Schema.Types.ObjectId,
  ref: "User",
    },
  members: [
    { type: Schema.Types.ObjectId, ref: "User" }
  ],
requests: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
      }
    ],
  membersCount: {
    type: Number,
    default: 1,
  },
  approved:{
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

const ProjectModel = (mongoose.models.Project as Model<Project>) ||
                     mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;


