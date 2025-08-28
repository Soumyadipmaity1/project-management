import mongoose, { Schema, Model, Document } from "mongoose";

export interface Project extends Document {
  _id: mongoose.Types.ObjectId;
  github?: string;
  liveDemo?: string;
  title: string;
  description: string;
  domain: string;
  badge: "active" | "completed" | "disabled";
  teamlead: string;
  colead?: string;
  members: string[];
  membersCount: number;
  approved: boolean;
  requests: {
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Rejected";
    createdAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<Project> = new Schema({
    github: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Optional field
        try {
          new URL(v);
          return true;
        } catch (e) {
          return false;
        }
      },
      message: "GitHub must be a valid URL"
    }
  },
  liveDemo: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Optional field
        try {
          new URL(v);
          return true;
        } catch (e) {
          return false;
        }
      },
      message: "Live Demo must be a valid URL"
    }
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  domain: {
    type: String,
    required: [true, "Domain is required"],
    trim: true,
    minlength: [2, "Domain must be at least 2 characters long"],
    maxlength: [50, "Domain cannot exceed 50 characters"],
  },
  badge: {
    type: String,
    enum: {
      values: ["active", "completed", "disabled"],
      message: "Badge must be either 'active', 'completed', or 'disabled'"
    },
    default: "active",
  },
  teamlead: {
    type: String,
    required: [true, "Team lead is required"],
  },
  colead: {
    type: String,
  },
  members: [{
    type: String,
  }],
  membersCount: {
    type: Number,
    default: 1,
    min: [1, "Members count must be at least 1"],
    max: [1000, "Members count cannot exceed 1000"],
  },
  requests: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Approved", "Rejected"],
        message: "Status must be either 'Pending', 'Approved', or 'Rejected'"
      },
      default: "Pending"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  approved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
 toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      const { __v, ...rest } = ret;
      return rest;
    }
  },
  toObject: { virtuals: true }
});

// Add indexes for better performance
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ teamlead: 1 });
ProjectSchema.index({ badge: 1 });
ProjectSchema.index({ approved: 1 });

// Add virtual for actual members count
ProjectSchema.virtual('actualMembersCount').get(function() {
  return this.members ? this.members.length : 0;
});

const ProjectModel = (mongoose.models.Project as Model<Project>) ||
                     mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;