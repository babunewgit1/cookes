document.addEventListener("DOMContentLoaded", () => {
  // Get form elements
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const logoutBtn = document.getElementById("logoutBtn");

  // Get navigation links
  const showSignupLink = document.getElementById("showSignup");
  const showLoginLink = document.getElementById("showLogin");
  const showForgotPasswordLink = document.getElementById("showForgotPassword");
  const backToLoginLink = document.getElementById("backToLogin");

  // Function to show a specific form and hide others
  const showForm = (formToShow) => {
    [loginForm, signupForm, forgotPasswordForm].forEach((form) => {
      form.style.display = form === formToShow ? "block" : "none";
    });
  };

  // Event listeners for navigation
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(signupForm);
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(loginForm);
  });

  showForgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(forgotPasswordForm);
  });

  backToLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    showForm(loginForm);
  });

  signupForm.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  });

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    // Here you would typically clear session/local storage
    logoutBtn.style.display = "none";
    document.getElementById("userEmail").style.display = "none";
    document.getElementById("userEmail").textContent = "";
    showForm(loginForm);
  });
});
