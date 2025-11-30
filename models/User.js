import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
});

export default mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);
