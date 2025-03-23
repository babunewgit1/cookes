// Handle login functionality with Bubble.io API

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm").querySelector("form");
  const toast = window.toast;
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  const userEmailDisplay = document.getElementById("userEmail");
  const requestBookingBtn = document.getElementById("requestBookingBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Check login status on page load
  checkLoginStatus();

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch(
        "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        if (data && data.response) {
          // Extract email directly from login response data
          const userEmail = email; // Use the email used for login
          
          if (userEmail) {
            // Store user data in cookies
            Cookies.set("userEmail", userEmail, { expires: 7, secure: true });
            if (data.response.token) {
              Cookies.set("authToken", data.response.token, {
                expires: 7,
                secure: true,
              });
            }

            // Update UI
            updateUIForLoggedInUser(userEmail);
            document.getElementById("loginForm").style.display = "none";

            toastTitle.textContent = "Success";
            toastMessage.textContent = "Login successful!";
            toast.show();

            // Clear the form
            loginForm.reset();
          }
        }
      } else {
        toastTitle.textContent = "Error";
        toastMessage.textContent =
          "Login failed: " + (data.message || "Invalid credentials");
        toast.show();
      }
    } catch (error) {
      console.error("Error during login:", error);
      toastTitle.textContent = "Error";
      toastMessage.textContent =
        "An error occurred during login. Please try again.";
      toast.show();
    }
  });

  // Handle logout
  logoutBtn.addEventListener("click", () => {
    // Clear cookies
    Cookies.remove("userEmail");
    Cookies.remove("authToken");

    // Update UI for logged out user
    updateUIForLoggedInUser(null);
    toastTitle.textContent = "Success";
    toastMessage.textContent = "Logged out successfully!";
    toast.show();
  });

  // Check login status
  function checkLoginStatus() {
    const userEmail = Cookies.get("userEmail");
    const authToken = Cookies.get("authToken");

    if (userEmail && authToken) {
      updateUIForLoggedInUser(userEmail);
    } else {
      updateUIForLoggedInUser(null);
    }
  }
});
