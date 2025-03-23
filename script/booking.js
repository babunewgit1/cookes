document.addEventListener("DOMContentLoaded", () => {
  const requestBookingBtn = document.querySelectorAll(".bookinglink");
  const authFormsWrapper = document.getElementById("authFormsWrapper");
  const loginForm = document.getElementById("loginForm");
  const toast = window.toast;
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

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
  });
});
