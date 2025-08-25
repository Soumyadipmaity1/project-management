import mongoose, {Schema, Document} from "mongoose";

export interface Announcement extends Document {
    // Profilepic: string,
    title: string,
    content: string,
    pinned: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const AnnouncementSchema : Schema<Announcement> = new Schema({
    // Profilepic: {
    //     type: String,
    //     required: [true, "ProfilePic is required"],
    //     trim:  true,
    // },
    title: {
        type: String,
        required: [true, "Nmae is required"],
        trim:true,
    },
    content: {
        type: String,
        required:[true, "Content is required"],
        trim:  true,
    },
    // month: {
    //     type: Number,
    //     required: [true, "Month number is required"],
    // },
    pinned: {
        type: Boolean,
        default: false,
    },
} , { timestamps:true });

AnnouncementSchema.index({ pinned:-1, createdAt:-1});

const AnnouncementModel = (mongoose.models.Announcement as mongoose.Model<Announcement>) ||
                         mongoose.model<Announcement>("Announcement", AnnouncementSchema);

export default AnnouncementModel;
