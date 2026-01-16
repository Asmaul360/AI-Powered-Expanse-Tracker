import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["expense", "income"],
      default: "expense",
    },

    icon: {
      type: String, // emoji / icon name / url
      default: "💰",
    },

    color: {
      type: String, // hex code like #FF5733
      default: "#000000",
    },

    description: {
      type: String,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
