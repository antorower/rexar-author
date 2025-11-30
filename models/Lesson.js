import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TemplateBook",
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    content: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["text", "video", "audio", "quiz", "markdown"],
      default: "text",
    },

    status: {
      type: String,
      enum: ["onboarding", "completed"],
      default: "onboarding",
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
