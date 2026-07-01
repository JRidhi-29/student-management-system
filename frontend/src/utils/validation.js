export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\d{10}$/;

export const COURSES = ["Computer Science", "Mechanical", "Electrical"];

// Returns an { field: errorMessage } object. Empty object means the form is valid.
export const validateStudentForm = (values) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!values.course?.trim()) {
    errors.course = "Please select a course";
  } else if (!COURSES.includes(values.course)) {
    errors.course = "Select a valid course";
  }

  if (!values.address?.trim()) {
    errors.address = "Address is required";
  }

  return errors;
};
