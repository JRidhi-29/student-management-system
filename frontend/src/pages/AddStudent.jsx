import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm";
import { createStudent } from "../api/studentApi";
import { useStudentsContext } from "../hooks/StudentsContext";

const AddStudent = () => {
  const navigate = useNavigate();
  const { refetch } = useStudentsContext();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await createStudent(values);
      await refetch();
      navigate("/students");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Add Student">
      <StudentForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Save Student" />
    </Layout>
  );
};

export default AddStudent;
