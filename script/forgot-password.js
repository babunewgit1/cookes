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
    console.log("Forgot password form submitted");

    const email = document.getElementById("resetEmail").value;
    console.log("Attempting to reset password for email:", email);

    try {
      console.log("Making API request to reset password...");
      const response = await fetch(
        "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_forgotpassword",
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
      if (response.ok) {
        toastTitle.textContent = "Success";
        toastMessage.textContent =
          "Password reset instructions sent to your email!";
        toast.show();
        // Clear the form
        forgotPasswordForm.reset();
      } else {
        console.error("Reset password failed:", data);
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
