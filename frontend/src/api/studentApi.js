import axiosInstance from "./axiosInstance";

// GET /students
export const fetchStudents = async () => {
  const res = await axiosInstance.get("/students");
  return res.data.data;
};

// GET /students/:id
export const fetchStudentById = async (id) => {
  const res = await axiosInstance.get(`/students/${id}`);
  return res.data.data;
};

// POST /students
export const createStudent = async (payload) => {
  const res = await axiosInstance.post("/students", payload);
  return res.data.data;
};

// PUT /students/:id
export const updateStudent = async (id, payload) => {
  const res = await axiosInstance.put(`/students/${id}`, payload);
  return res.data.data;
};

// DELETE /students/:id
export const deleteStudent = async (id) => {
  const res = await axiosInstance.delete(`/students/${id}`);
  return res.data.data;
};
