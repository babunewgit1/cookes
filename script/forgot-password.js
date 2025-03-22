// Handle forgot password functionality with Bubble.io API

document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document
    .getElementById("forgotPasswordForm")
    .querySelector("form");
  const toast = window.toast;
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("resetEmail").value;

    try {
      const response = await fetch(
        "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_reset_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();
      console.log("Reset password response:", data);

      if (response.ok) {
        toastTitle.textContent = "Success";
        toastMessage.textContent =
          "Password reset instructions sent to your email!";
        toast.show();
        // Clear the form
        forgotPasswordForm.reset();
        // Switch to login form
        document.getElementById("forgotPasswordForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
      } else {
        toastTitle.textContent = "Error";
        toastMessage.textContent =
          "Password reset failed: " + (data.message || "Unknown error");
        toast.show();
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toastTitle.textContent = "Error";
      toastMessage.textContent =
        "An error occurred during password reset. Please try again.";
      toast.show();
    }
  });
});
