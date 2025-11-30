import mongoose from "mongoose";
import slugify from "slugify";

const BookSchema = new mongoose.Schema(
  {
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      maxlength: 105,
      minlength: 5,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 800,
      minlength: 2,
      trim: true,
      required: true,
    },
    cover: String,

    lessons: [String],

    persona: {
      type: String,
      maxlength: 2000,
      minlength: 0,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
      required: true,
    },
    subcategory: {
      type: String,
      trim: true,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "public"],
      default: "draft",
      required: true,
    },
    price: {
      type: Number,
      default: 9.99,
      min: 0,
      max: 100,
      required: true,
    },

    slug: {
      type: String,
      maxlength: 300,
      minlength: 2,
      unique: true,
      trim: true,
      required: true,
    },
    source: {
      type: String,
      trim: true,
      enum: ["original", "copy"],
      default: "original",
      required: true,
    },

    contentPrompt: {
      type: String,
      minlength: 50,
      maxlength: 1000,
    },
    lessonPrompt: {
      type: String,
      minlength: 50,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("title")) {
    if (this.title) {
      this.slug = slugify(this.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }
  }

  next();
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
