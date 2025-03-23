document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  const requestBookingBtn = document.querySelectorAll(".bookinglink");
=======
  const requestBookingBtn = document.getElementById("requestBookingBtn");
>>>>>>> b3e29c16b7ae37fe030c5ea3ae06dd4388d43331
  const authFormsWrapper = document.getElementById("authFormsWrapper");
  const loginForm = document.getElementById("loginForm");
  const toast = window.toast;
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

<<<<<<< HEAD
  requestBookingBtn.forEach((bookingBtn) => {
    bookingBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior

      const userEmail = Cookies.get("userEmail");
      const authToken = Cookies.get("authToken");
      const isLoggedIn = userEmail && authToken;

      if (!isLoggedIn) {
        // Show auth forms wrapper and login form if user is not logged in
        authFormsWrapper.style.display = "block";
        loginForm.style.display = "block";
        return;
      }

      const aircraftDetails = {
        type: bookingBtn.dataset.type,
        flightRequestId: bookingBtn.dataset.flightrequestid,
        aircraftId: bookingBtn.dataset.aircraftid,
      };

      // Store in localStorage
      localStorage.setItem("aircraft_details", JSON.stringify(aircraftDetails));

      // Redirect to value.html
      window.location.href = "value.html";
    });
=======
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
            fare_class: "fare_class",
            catering: "yes",
            groundtransfers: "yes",
            de_icinginsurance: "no",
            croudsource: "yes",
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

    window.location.href = "natural.html";
>>>>>>> b3e29c16b7ae37fe030c5ea3ae06dd4388d43331
  });
});
