document.addEventListener("DOMContentLoaded", () => {
  const requestBookingBtn = document.getElementById("requestBookingBtn");
  const authFormsWrapper = document.getElementById("authFormsWrapper");
  const loginForm = document.getElementById("loginForm");
  const toast = window.toast;
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  requestBookingBtn.addEventListener("click", async () => {
    // Check if user is logged in by checking cookies
    const userEmail = Cookies.get("userEmail");
    const authToken = Cookies.get("authToken");
    const isLoggedIn = userEmail && authToken;

    if (!isLoggedIn) {
      // Show auth forms wrapper and login form if user is not logged in
      authFormsWrapper.style.display = "block";
      loginForm.style.display = "block";

      return;
    }

    // Proceed with booking if user is logged in
    try {
      const response = await fetch(
        "https://operators-dashboard.bubbleapps.io/api/1.1/wf/book_now_button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            type: "market",
            aircraftid: "1532651018760x276169315074179070",
            flightrequestid: "1742638124789x777900706104506600",
            price: "14867200",
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        toastTitle.textContent = "Success";
        toastMessage.textContent = "Booking request sent successfully!";
        toast.show();
      } else {
        toastTitle.textContent = "Error";
        toastMessage.textContent =
          "Booking request failed: " + (data.message || "Unknown error");
        toast.show();
      }
    } catch (error) {
      console.error("Error during booking request:", error);
      toastTitle.textContent = "Error";
      toastMessage.textContent =
        "An error occurred during booking request. Please try again.";
      toast.show();
    }
  });
});
