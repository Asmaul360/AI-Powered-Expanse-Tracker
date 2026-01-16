import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "bank"],
      default: "cash",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
