document.addEventListener("DOMContentLoaded", () => {
  // Grab form elements
  const form = document.getElementById("signup-form");
  const successBox = document.getElementById("success-box");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  // Regex Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d).{8,}$/; // At least 8 characters and at least 1 number

  // Helper function to set an error state
  function setError(input, message) {
    input.classList.add("invalid");
    const errorDisplay = input.parentElement.querySelector(".error-msg");
    if (errorDisplay) {
      errorDisplay.textContent = message;
    }
  }

  // Helper function to clear an error state
  function clearError(input) {
    input.classList.remove("invalid");
    const errorDisplay = input.parentElement.querySelector(".error-msg");
    if (errorDisplay) {
      errorDisplay.textContent = "";
    }
  }

  // Individual field validation functions
  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      setError(nameInput, "Name is required.");
      return false;
    } else if (value.length < 3) {
      setError(nameInput, "Name must be at least 3 characters.");
      return false;
    } else {
      clearError(nameInput);
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === "") {
      setError(emailInput, "Email is required.");
      return false;
    } else if (!emailRegex.test(value)) {
      setError(emailInput, "Please enter a valid email address.");
      return false;
    } else {
      clearError(emailInput);
      return true;
    }
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (value === "") {
      setError(passwordInput, "Password is required.");
      return false;
    } else if (!passwordRegex.test(value)) {
      setError(passwordInput, "Password must be at least 8 characters with at least 1 number.");
      return false;
    } else {
      clearError(passwordInput);
      return true;
    }
  }

  function validateConfirmPassword() {
    const passwordValue = passwordInput.value;
    const confirmValue = confirmPasswordInput.value;

    if (confirmValue === "") {
      setError(confirmPasswordInput, "Please confirm your password.");
      return false;
    } else if (confirmValue !== passwordValue) {
      setError(confirmPasswordInput, "Passwords do not match.");
      return false;
    } else {
      clearError(confirmPasswordInput);
      return true;
    }
  }

  // Real-time error clearing on input
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", () => {
    validatePassword();
    // Re-check confirm password if user edits main password
    if (confirmPasswordInput.value !== "") {
      validateConfirmPassword();
    }
  });
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);

  // Form submit handler
  form.addEventListener("submit", (e) => {
    // 1. Prevent page reload
    e.preventDefault();

    // 2. Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // 3. If all fields are valid, hide form and show success card
    const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    if (isFormValid) {
      form.classList.add("hidden");
      successBox.classList.remove("hidden");
    }
  });
});