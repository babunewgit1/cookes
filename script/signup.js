// Handle signup functionality with Bubble.io API

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm").querySelector("form");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");
  const userEmailDisplay = document.getElementById("userEmail");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (password !== confirmPassword) {
      toastTitle.textContent = "Error";
      toastMessage.textContent = "Passwords do not match!";
      toast.show();
      return;
    }

    try {
      const response = await fetch(
        "https://operators-dashboard.bubbleapps.io/api/1.1/wf/webflow_signup",
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
      console.log("Signup response:", data);

      if (response.ok) {
        // Use the email from signup form directly
        const userEmail = email;
        
        // Store user data in cookies
        Cookies.set("userEmail", userEmail, { expires: 7, secure: true });
        if (data.response && data.response.token) {
          Cookies.set("authToken", data.response.token, {
            expires: 7,
            secure: true,
          });
        }

        // Update UI
        updateUIForLoggedInUser(userEmail);
        document.getElementById("signupForm").style.display = "none";

        toastTitle.textContent = "Success";
        toastMessage.textContent = "Signup successful!";
        toast.show();

        // Clear the form
        signupForm.reset();
      } else {
        toastTitle.textContent = "Error";
        toastMessage.textContent =
          "Signup failed: " + (data.message || "Unknown error");
        toast.show();
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toastTitle.textContent = "Error";
      toastMessage.textContent =
        "An error occurred during signup. Please try again.";
      toast.show();
    }
  });
});
