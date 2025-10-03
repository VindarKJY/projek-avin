// Main application controller
class App {
  constructor() {
    this.navigationManager = null;
    this.contactFormManager = null;

    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeModules();
      });
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    try {
      // Initialize navigation manager
      this.navigationManager = new NavigationManager();

      // Initialize contact form manager
      this.contactFormManager = new ContactFormManager();

      console.log("✅ Application initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize application:", error);
    }
  }
}

// Initialize the application
const app = new App();
