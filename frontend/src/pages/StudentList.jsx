import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import Banner from "../components/Banner";
import ConfirmDialog from "../components/ConfirmDialog";
import { useStudentsContext } from "../hooks/StudentsContext";
import { deleteStudent as deleteStudentApi } from "../api/studentApi";

const courseBadgeClass = {
  "Computer Science": "bg-cs-light text-cs",
  Mechanical: "bg-mech-light text-mech",
  Electrical: "bg-electrical-light text-electrical",
};

const StudentList = () => {
  const navigate = useNavigate();
  const { students, loading, error, refetch } = useStudentsContext();
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null); // student object
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Instant client-side filtering — no network round trip, no page refresh.
  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.course.toLowerCase().includes(term) ||
        s.phone.includes(term)
    );
  }, [students, search]);

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteStudentApi(pendingDelete._id);
      setPendingDelete(null);
      refetch();
    } catch (err) {
      setDeleteError(err.message || "Failed to delete student");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout
      title="Students"
      actions={
        <button
          onClick={() => navigate("/students/add")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          <PlusIcon />
          Add Student
        </button>
      }
    >
      <Banner type="error" onDismiss={refetch}>
        {error}
      </Banner>
      <Banner type="error" onDismiss={() => setDeleteError("")}>
        {deleteError}
      </Banner>

      <div className="mb-5 mt-1 max-w-sm">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or course..."
            className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {loading ? (
        <Spinner label="Loading students..." fullPage />
      ) : filteredStudents.length === 0 ? (
        <EmptyState hasSearch={!!search} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-bg/60 text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Address</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-b border-line last:border-0 hover:bg-bg/50">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-ink">{student.name}</div>
                    <div className="text-xs text-muted">{student.email}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-muted/70">
                      #{student._id.slice(-6)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink">{student.phone}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        courseBadgeClass[student.course] || "bg-bg text-muted"
                      }`}
                    >
                      {student.course}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-5 py-3.5 text-muted">{student.address}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/students/edit/${student._id}`)}
                        className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-bg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setPendingDelete(student)}
                        className="rounded-md border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger transition hover:bg-danger-light"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this student?"
        message={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name} from your records. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDelete(null)}
      />
    </Layout>
  );
};

const EmptyState = ({ hasSearch }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface py-16 text-center">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-bg text-muted">
      <SearchIcon size={20} />
    </div>
    <h3 className="font-display text-base font-semibold text-ink">No Students Found</h3>
    <p className="mt-1 max-w-xs text-sm text-muted">
      {hasSearch
        ? "No students match your search. Try a different name, email, phone, or course."
        : "You haven't added any students yet. Get started by adding your first student."}
    </p>
  </div>
);

function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default StudentList;
