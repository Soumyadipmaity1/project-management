import { Project } from './../components/Member/Projects/MemberProj';
import mongoose, {Schema,Document, mongo} from "mongoose";
export interface Message extends Document {
    content: string,
    createdAt: Date,
}

export interface User extends Document {
    _id: mongoose.Types.ObjectId; 
  name: string;
  email: string;
  password: string;
  rollNo: string;
  role: "Admin" | "Lead" | "Member" | "ProjectLead" | "CoLead" | "member" | "lead" | "admin" | "projectlead" | "colead";
  domain: string;
  githubId: string;
  linkedinId: string;
  profilePic: string;
  profilePicPublicId: string;
  emailVerified: boolean;
  otp: string;
  otpExpiry: Date;
  projects: { projectId: mongoose.Types.ObjectId; projectName: string }[];
  ProjectCount: number;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },   
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
    },
    role: {
  type: String,
  enum: ["Admin", "Lead", "Member", "ProjectLead", "CoLead"],
  default: "Member",
},
    githubId: { 
        type: String, 
        required:[true,"GithubId is required"],
    },
    linkedinId: { 
        type: String,
        required:[true,"LinkedId is required"],
    },
    domain: {
      type: String,
      required: [true, "Domain is required"],
    },
    profilePic: {
      type: String,
      required: true,
    },
    profilePicPublicId:{
    type: String,
    required: [true, "ProfilePicPublicId is required"],
    default: function (this: any) {
        return this._id.toString();
      },
    },
    emailVerified:{
      type:Boolean,
      default: false,
    },
    otp:{
      type:String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
   projects: [
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    projectName: { type: String, required: true },
  },
],
  ProjectCount: {
    type: Number,
    default: 0,
    min: [0, "Project count must be at least 0"],
    max: [1000, "Project count cannot exceed 1000"],
  },
  },
  { timestamps: true ,
   toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      const { __v, ...rest } = ret;
      return rest;
    }
  },
  toObject: { virtuals: true }
  }
);

UserSchema.pre("save", function (next) {
  this.ProjectCount = this.projects ? this.projects.length : 0;
  next();
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
