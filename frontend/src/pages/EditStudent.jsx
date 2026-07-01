import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm";
import Spinner from "../components/Spinner";
import Banner from "../components/Banner";
import { fetchStudentById, updateStudent } from "../api/studentApi";
import { useStudentsContext } from "../hooks/StudentsContext";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetch } = useStudentsContext();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadStudent = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await fetchStudentById(id);
        if (isMounted) setStudent(data);
      } catch (err) {
        if (isMounted) setLoadError(err.message || "Failed to load student");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadStudent();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await updateStudent(id, values);
      await refetch();
      navigate("/students");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Edit Student">
      {loading ? (
        <Spinner label="Loading student..." fullPage />
      ) : loadError ? (
        <Banner type="error">{loadError}</Banner>
      ) : (
        <StudentForm
          initialValues={student}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Update Student"
        />
      )}
    </Layout>
  );
};

export default EditStudent;
