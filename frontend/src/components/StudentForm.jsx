import React, { useEffect, useState } from "react";
import { COURSES, validateStudentForm } from "../utils/validation";
import Banner from "./Banner";

const emptyForm = { name: "", email: "", phone: "", course: "", address: "" };

const StudentForm = ({ initialValues, onSubmit, submitLabel = "Save Student", submitting = false }) => {
  const [values, setValues] = useState(initialValues || emptyForm);
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  const errors = validateStudentForm(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, course: true, address: true });
    if (!isValid) return;

    setFormError("");
    try {
      await onSubmit(values);
    } catch (err) {
      setFormError(err.message || "Something went wrong while saving. Please try again.");
    }
  };

  const fieldClass = (field) =>
    `w-full rounded-lg border px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
      touched[field] && errors[field] ? "border-danger" : "border-line focus:border-primary"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
      <Banner type="error" onDismiss={() => setFormError("")}>
        {formError}
      </Banner>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Priya Sharma"
          className={fieldClass("name")}
        />
        {touched.name && errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. priya.sharma@email.com"
          className={fieldClass("email")}
        />
        {touched.email && errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          inputMode="numeric"
          value={values.phone}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
            setValues((prev) => ({ ...prev, phone: digitsOnly }));
          }}
          onBlur={handleBlur}
          placeholder="10-digit phone number"
          className={fieldClass("phone")}
        />
        {touched.phone && errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="course" className="mb-1.5 block text-sm font-medium text-ink">
          Course
        </label>
        <select
          id="course"
          name="course"
          value={values.course}
          onChange={handleChange}
          onBlur={handleBlur}
          className={fieldClass("course")}
        >
          <option value="">Select a course</option>
          {COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        {touched.course && errors.course && <p className="mt-1 text-xs text-danger">{errors.course}</p>}
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Street, City, State, ZIP"
          className={fieldClass("address")}
        />
        {touched.address && errors.address && <p className="mt-1 text-xs text-danger">{errors.address}</p>}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
        <span className="text-xs text-muted">
          {isValid ? "All fields look good." : "Fill in all fields correctly to enable saving."}
        </span>
      </div>
    </form>
  );
};

export default StudentForm;
