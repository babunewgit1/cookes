// Utility functions for authentication system

function showAuthFormsWrapper() {
  const authFormsWrapper = document.getElementById("authFormsWrapper");
  if (authFormsWrapper) {
    authFormsWrapper.style.display = "block";
  }
}

function hideAuthFormsWrapper() {
  const authFormsWrapper = document.getElementById("authFormsWrapper");
  if (authFormsWrapper) {
    authFormsWrapper.style.display = "none";
  }
}

function updateUIForLoggedInUser(userEmail) {
  const userEmailDisplay = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const authFormsWrapper = document.getElementById("authFormsWrapper");

  if (userEmail && typeof userEmail === 'string') {
    userEmailDisplay.textContent = userEmail;
    userEmailDisplay.style.display = "inline-block";
    logoutBtn.style.display = "inline-block";
    hideAuthFormsWrapper();
  } else {
    userEmailDisplay.style.display = "none";
    logoutBtn.style.display = "none";
    showAuthFormsWrapper();
  }
}

// Export functions to global scope
window.showAuthFormsWrapper = showAuthFormsWrapper;
window.hideAuthFormsWrapper = hideAuthFormsWrapper;
window.updateUIForLoggedInUser = updateUIForLoggedInUser;

// Initialize auth forms wrapper on page load
document.addEventListener("DOMContentLoaded", () => {
  hideAuthFormsWrapper();
  const userEmail = Cookies.get("userEmail");
  const authToken = Cookies.get("authToken");

  if (userEmail && authToken) {
    updateUIForLoggedInUser(userEmail);
  } else {
    showAuthFormsWrapper();
  }
});
