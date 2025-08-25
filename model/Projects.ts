import mongoose,  {Schema , Model ,Document } from "mongoose";

export interface Project extends Document {
    title: string;
    description: string;
    domain: string;
    badge: "active" | "completed" | "disabled";
    teamlead: mongoose.Types.ObjectId;
    colead?: mongoose.Types.ObjectId;
    pendingMembers?: mongoose.Types.ObjectId;
    membersCount: number;
    approved: boolean;
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
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
colead: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
pendingMembers: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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