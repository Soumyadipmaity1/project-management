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
  isVerified: boolean;
  role: "admin" | "team_lead" | "member";
  domain: string;
  githubId?: string;
  linkedinId?: string;
  profilePhoto?: string;
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
    isVerified: {
    type: Boolean,
     default: false,
    },
    role: {
      type: String,
      enum: ["admin", "team_lead", "member"],
      default: "member",
    },
    githubId: { 
        type: String 
    },
    linkedinId: { 
        type: String 
    },
    domain: {
      type: String,
      required: [true, "Domain is required"],
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
