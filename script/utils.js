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

  if (userEmail && typeof userEmail === "string") {
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

  document
    .getElementById("logoutBtn")
    .addEventListener("click", async function () {
      try {
        // Retrieve the token from cookies or local storage
        const token = Cookies.get("authToken");

        if (!token) {
          alert("Authentication token is missing. Please log in again.");
          return;
        }

        // Hit the logout API endpoint with the token
        const response = await fetch(
          "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // Clear user session or cookies if applicable
          Cookies.remove("userSession");
          Cookies.remove("authToken"); // Remove the token
          toastTitle.textContent = "Success";
          toastMessage.textContent = "Logout successful!";
          toast.show();
          // Redirect to the root directory
          window.location.href = "/";
        } else {
          console.error("Failed to logout: ", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    });
});
