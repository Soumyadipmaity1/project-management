import mongoose, {Schema,Document, mongo} from "mongoose";
export interface Message extends Document {
    content: string,
    createdAt: Date,
}

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  rollNo: string;
  role: "Admin" | "Lead" | "Member" | "ProjectLead" | "CoLead";
  domain: string;
  githubId: string;
  linkedinId: string;
  profilePic: string;
  profilePicPublicId: string;
  emailVerified: boolean;
  otp: string;
  otpExpiry: Date;
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
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
