import mongoose, {Schema, Document} from "mongoose";

export interface Announcement extends Document {
    Profilepic: string,
    name: string,
    data: string,
    month: number,
    pinned: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const AnnouncementSchema : Schema<Announcement> = new Schema({
    Profilepic: {
        type: String,
        required: [true, "ProfilePic is required"],
        trim:  true,
    },
    name: {
        type: String,
        required: [true, "Nmae is required"],
        trim:true,
    },
    data: {
        type: String,
        required:[true, "Content is required"],
        trim:  true,
    },
    month: {
        type: Number,
        required: [true, "Month number is required"],
    },
    pinned: {
        type: Boolean,
        default: false,
    },
} , { timestamps:true });

AnnouncementSchema.index({ pinned:-1, createdAt:-1});

const AnnouncementModel = (mongoose.models.Announcement as mongoose.Model<Announcement>) ||
                         mongoose.model<Announcement>("Announcement", AnnouncementSchema);

export default AnnouncementModel;
