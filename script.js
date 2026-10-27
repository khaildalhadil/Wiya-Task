// Registration form: validation runs in the browser only, nothing is sent or stored.

const form = document.getElementById('register-form');
const successMessage = document.getElementById('success-message');

const NAME_PATTERN = /^[\p{L}\p{M} '-]{3,}$/u; // letters in any language, spaces, ' and -
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // name@domain.tld
const PHONE_PATTERN = /^\+?\d{8,15}$/; // optional +, then 8 to 15 digits

// One rule per field (keyed by the input's name): returns an error message, or '' if valid.
const validators = {
  fullName(value) {
    const name = value.trim();
    if (!name) return 'Full name is required.';
    if (!NAME_PATTERN.test(name)) return 'Use at least 3 letters, without numbers or symbols.';
    return '';
  },

  email(value) {
    const email = value.trim();
    if (!email) return 'Email address is required.';
    if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email, e.g. you@example.com.';
    return '';
  },

  phone(value) {
    const phone = value.replace(/[\s()-]/g, ''); // accept spaces, dashes and brackets
    if (!phone) return 'Phone number is required.';
    if (!PHONE_PATTERN.test(phone)) return 'Enter a valid phone number (8 to 15 digits).';
    return '';
  },

  password(value) {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/\p{L}/u.test(value) || !/\d/.test(value)) return 'Password must include letters and numbers.';
    return '';
  },

  confirmPassword(value) {
    if (!value) return 'Please confirm your password.';
    if (value !== form.elements.password.value) return 'Passwords do not match.';
    return '';
  },

  terms(checked) {
    return checked ? '' : 'You must accept the Terms & Conditions.';
  },
};

const fields = Array.from(form.elements).filter((element) => element.name in validators);

// Checks one field, shows its message next to it, and returns true if it is valid.
function validateField(input) {
  const value = input.type === 'checkbox' ? input.checked : input.value;
  const message = validators[input.name](value);

  document.getElementById(`${input.name}-error`).textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return !message;
}

// Check a field when the user leaves it.
form.addEventListener('focusout', (event) => {
  if (fields.includes(event.target)) validateField(event.target);
});

// While typing, re-check a field that shows an error, so the error clears as soon as it is fixed.
form.addEventListener('input', (event) => {
  const input = event.target;
  if (input.getAttribute('aria-invalid') === 'true') validateField(input);

  // A new password can break (or fix) a confirmation that was already checked.
  const confirm = form.elements.confirmPassword;
  if (input.name === 'password' && confirm.hasAttribute('aria-invalid')) validateField(confirm);
});

form.addEventListener('submit', (event) => {
  event.preventDefault(); // no backend: the form is never actually sent
  successMessage.textContent = '';

  // Validate every field (so all errors show at once) and keep the invalid ones.
  const invalidFields = fields.filter((field) => !validateField(field));
  if (invalidFields.length > 0) {
    invalidFields[0].focus(); // take the user straight to the first problem
    return;
  }

  // Demo success: nothing is sent or saved anywhere.
  const firstName = form.elements.fullName.value.trim().split(' ')[0];
  successMessage.textContent = `Welcome, ${firstName}! Your account has been created (demo only, nothing was sent or saved).`;
  successMessage.scrollIntoView({ block: 'nearest' }); // keep it visible on small screens

  // Clear the form so the password doesn't stay on the page, and start fresh with no field marked as checked.
  form.reset();
  fields.forEach((field) => field.removeAttribute('aria-invalid'));
});
