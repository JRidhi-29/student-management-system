const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      enum: {
        values: ["Computer Science", "Mechanical", "Electrical"],
        message: "Course must be one of: Computer Science, Mechanical, Electrical",
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// Extra safety net: unique index at the DB level (in addition to schema option)
studentSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
