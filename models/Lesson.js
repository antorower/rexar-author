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

/* =======================
   PRE-SAVE ORDER LOGIC
   ======================= */

LessonSchema.pre("save", async function (next) {
  try {
    const Lesson = this.constructor;
    const doc = this;

    if (!doc.chapter) {
      return next(new Error("Lesson must belong to a chapter"));
    }

    // ----- CASE 1: NEW LESSON -----
    if (doc.isNew) {
      // Αν δεν υπάρχει order → πήγαινέ το στο τέλος
      if (doc.order == null || doc.order === 0) {
        const last = await Lesson.findOne({ chapter: doc.chapter }).sort({ order: -1 }).select("order").lean();

        doc.order = last ? last.order + 1 : 1;
        return next();
      }

      // Έχει δοθεί order → shift lessons με order >= doc.order
      await Lesson.updateMany(
        {
          chapter: doc.chapter,
          order: { $gte: doc.order },
        },
        { $inc: { order: 1 } }
      );

      return next();
    }

    // ----- CASE 2: EXISTING LESSON WITHOUT ORDER CHANGE -----
    if (!doc.isModified("order")) {
      return next();
    }

    // ----- CASE 3: EXISTING LESSON WITH NEW ORDER -----
    const existing = await Lesson.findById(doc._id).select("order chapter").lean();

    if (!existing) return next();
    if (existing.chapter.toString() !== doc.chapter.toString()) {
      return next(new Error("Cannot move lessons across chapters via save()"));
    }

    const oldOrder = existing.order;
    const newOrder = doc.order;

    if (oldOrder === newOrder) return next();

    // Moving DOWN: e.g. 2 -> 5
    if (newOrder > oldOrder) {
      await Lesson.updateMany(
        {
          chapter: doc.chapter,
          _id: { $ne: doc._id },
          order: { $gt: oldOrder, $lte: newOrder },
        },
        { $inc: { order: -1 } }
      );
    }

    // Moving UP: e.g. 5 -> 2
    if (newOrder < oldOrder) {
      await Lesson.updateMany(
        {
          chapter: doc.chapter,
          _id: { $ne: doc._id },
          order: { $gte: newOrder, $lt: oldOrder },
        },
        { $inc: { order: 1 } }
      );
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
