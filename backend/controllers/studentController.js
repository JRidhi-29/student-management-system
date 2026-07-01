const Student = require("../models/Student");

// @desc    Get all students (supports optional ?search= query)
// @route   GET /students
const getStudents = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      filter = {
        $or: [{ name: regex }, { email: regex }, { course: regex }, { phone: regex }],
      };
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students", error: error.message });
  }
};

// @desc    Get single student by ID
// @route   GET /students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }
    res.status(500).json({ success: false, message: "Failed to fetch student", error: error.message });
  }
};

// @desc    Create a new student
// @route   POST /students
const createStudent = async (req, res) => {
  try {
    const { name, email, phone, course, address } = req.body;

    const existing = await Student.findOne({ email: email?.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "A student with this email already exists" });
    }

    const student = await Student.create({ name, email, phone, course, address });
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "A student with this email already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Failed to create student", error: error.message });
  }
};

// @desc    Update an existing student
// @route   PUT /students/:id
const updateStudent = async (req, res) => {
  try {
    const { name, email, phone, course, address } = req.body;

    if (email) {
      const existing = await Student.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: req.params.id },
      });
      if (existing) {
        return res.status(409).json({ success: false, message: "A student with this email already exists" });
      }
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, course, address },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "A student with this email already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }
    res.status(500).json({ success: false, message: "Failed to update student", error: error.message });
  }
};

// @desc    Delete a student
// @route   DELETE /students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: "Student deleted successfully", data: student });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }
    res.status(500).json({ success: false, message: "Failed to delete student", error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
