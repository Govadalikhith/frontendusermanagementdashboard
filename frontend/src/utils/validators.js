/**
 * Validates whether an email format is correct.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  return EMAIL_REGEX.test(email);
};

/**
 * Validates the user input form data.
 * @param {Object} formData 
 * @returns {Object} Key-value pair of errors.
 */
export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = 'First Name is required.';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First Name must be at least 2 characters.';
  }

  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = 'Last Name is required.';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last Name must be at least 2 characters.';
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(formData.email.trim())) {
    errors.email = 'Invalid Email format.';
  }

  if (!formData.department || !formData.department.trim()) {
    errors.department = 'Department is required.';
  }

  return errors;
};
