import mongoose,  {Schema , Model ,Document } from "mongoose";

export interface Project extends Document {
    title: string;
    description: string;
    domain: string;
    badge: "active" | "completed" | "disabled";
    teamlead: string;
    colead: string;
    membersCount: number;
    approved: boolean;
    createdAt: Date;
    UpdatedAt: Date;
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
    teamlead:{
        type: String,
        required: [true, "Team lead is required"],
        trim: true,
    },
  colead: {
    type: String,
    trim: true,
  },
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