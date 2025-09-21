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
  role: "Admin" | "Lead" | "Member";
  domain: string;
  githubId: string;
  linkedinId: string;
  profilePic: string;
  profilePicPublicId: string;
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
  enum: ["Admin", "Lead", "Member"],
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
      required: false,
      default: "/user.png",
    },
    profilePicPublicId:{
    type: String,
    required: [true, "ProfilePicPublicId is required"],
    default: function (this: any) {
        return this._id.toString();
      },
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
