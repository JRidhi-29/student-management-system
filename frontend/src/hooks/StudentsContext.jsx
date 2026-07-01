import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchStudents } from "../api/studentApi";

const StudentsContext = createContext(null);

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const value = { students, loading, error, refetch: loadStudents };

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
};

export const useStudentsContext = () => {
  const ctx = useContext(StudentsContext);
  if (!ctx) {
    throw new Error("useStudentsContext must be used within a StudentsProvider");
  }
  return ctx;
};
