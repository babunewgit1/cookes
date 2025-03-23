// Custom Toast Implementation
class Toast {
  constructor(element) {
    this.element = element;
    this.closeButton = element.querySelector(".btn-close");
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.hide());
    }
  }

  show() {
    this.element.classList.add("show");
    // Auto-hide after 5 seconds
    setTimeout(() => this.hide(), 5000);
  }

  hide() {
    this.element.classList.remove("show");
  }
}

// Initialize toast when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.toast = new Toast(document.getElementById("notificationToast"));
});
