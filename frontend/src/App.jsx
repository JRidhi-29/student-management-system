import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { StudentsProvider } from "./hooks/StudentsContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import NotFound from "./pages/NotFound";

// Wraps all authenticated pages in a single StudentsProvider instance, so
// student data is fetched once and shared/cached across Dashboard <-> Students
// navigation instead of refetching on every page switch.
const StudentsLayout = () => (
  <StudentsProvider>
    <Outlet />
  </StudentsProvider>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<StudentsLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
