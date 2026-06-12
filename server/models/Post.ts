import mongoose from "mongoose";
import { platform } from "node:os";

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true},
        content: {type: String, required: true},
        mediaUrl: {type: String},
        mediatype: {type: String, enum: ["image", "video"]},
        platforms: [{type: String, enum: ["twitter", "linkedin", "facebook", "instagram","facebook_page", "linkedin_page", "instagram_business"]}],
        scheduleFor: {type: String, enum: ["draft", "scheduled", "published", "failed"], default: "scheduled"},
    
}, {timestamps: true})


export const Post = mongoose.model("Post", postSchema)