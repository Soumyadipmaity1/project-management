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
// import mongoose, { Schema, Model, Document } from "mongoose";

// export interface IProject extends Document {
//   _id: mongoose.Types.ObjectId;
//   title: string;
//   description: string;
//   domain: string[];
//   github: string;
//   liveDemo: string;
//   startDate: Date;
//   completionDate: Date;
//   image: string;
//   badge: "active" | "completed" | "disabled" | "available";
//   projectlead: mongoose.Types.ObjectId;
//   colead: mongoose.Types.ObjectId;
//   members: mongoose.Types.ObjectId[];
//   membersCount: number;
//   enrolled?: boolean;
//   approved: boolean;
//   requests: {
//     user: mongoose.Types.ObjectId;
//     status: "Pending" | "Approved" | "Rejected";
//     createdAt?: Date;
//   }[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ProjectSchema = new Schema<IProject>(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       minlength: [3, "Title must be at least 3 characters long"],
//       maxlength: [100, "Title cannot exceed 100 characters"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       minlength: [10, "Description must be at least 10 characters long"],
//       maxlength: [1000, "Description cannot exceed 1000 characters"],
//       trim: true,
//     },
//     domain: {
//       type: [String],
//       required: true,
//       validate: [
//         {
//           validator: (arr: string[]) => arr.length >= 1 && arr.length <= 3,
//           message: "You must provide between 1 and 3 domains.",
//         },
//       ],
//     },
//     github: {
//       type: String,
//       required: [true, "GitHub link is required"],
//       trim: true,
//       validate: {
//         validator(v: string) {
//           return /^https:\/\/(www\.)?github\.com\/.+/.test(v);
//         },
//         message: "GitHub must be a valid GitHub repository URL",
//       },
//     },
//     liveDemo: {
//       type: String,
//       required: [true, "Live demo link is required"],
//       trim: true,
//       validate: {
//         validator(v: string) {
//           return /^https?:\/\/.+/.test(v);
//         },
//         message: "Live Demo must be a valid URL",
//       },
//     },
//     startDate: {
//       type: Date,
//       required: [true, "Project start date is required"],
//     },
//     completionDate: {
//       type: Date,
//       required: [true, "Project completion date is required"],
//       validate: {
//         validator(this: IProject, v: Date) {
//           if (!v) return true;
//           return !this.startDate || v >= this.startDate;
//         },
//         message: "Completion date must be after or equal to the start date",
//       },
//     },
//     image: {
//       type: String,
//       required: [true, "Project image is required"],
//       validate: {
//         validator(v: string) {
//           return /^https?:\/\/.+/.test(v) || v.startsWith("/uploads/");
//         },
//         message: "Image must be a valid URL or Cloudinary link",
//       },
//     },
//     badge: {
//       type: String,
//       enum: ["active", "completed", "disabled", "available"],
//       default: "active",
//     },
//     projectlead: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Project lead is required"],
//     },
//     colead: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Co-lead is required"],
//     },
//     members: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     membersCount: {
//       type: Number,
//       default: 1,
//       min: [1, "Members count must be at least 1"],
//     },
//     enrolled: {
//       type: Boolean,
//       default: false,
//     },
//     approved: {
//       type: Boolean,
//       default: false,
//     },
//     requests: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         status: {
//           type: String,
//           enum: ["Pending", "Approved", "Rejected"],
//           default: "Pending",
//         },
//         createdAt: { type: Date, default: Date.now },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// ProjectSchema.pre("save", function (next) {
//   this.membersCount = this.members?.length || 1;
//   next();
// });

// const ProjectModel: Model<IProject> =
//   mongoose.models?.Project ||
//   mongoose.model<IProject>("Project", ProjectSchema);

// export default ProjectModel;
