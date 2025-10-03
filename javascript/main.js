// Mobile menu functionality
class NavigationManager {
  constructor() {
    this.mobileMenu = document.getElementById("mobileMenu");
    this.navLinks = document.getElementById("navLinks");
    this.navOverlay = document.getElementById("navOverlay");
    this.navItems = document.querySelectorAll(".nav-links a");

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupScrollAnimations();
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.mobileMenu.addEventListener("click", () => this.toggleMobileMenu());
    this.navOverlay.addEventListener("click", () => this.toggleMobileMenu());

    // Close mobile menu when link is clicked
    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          this.toggleMobileMenu();
        }
      });
    });

    // Handle window resize
    window.addEventListener("resize", () => this.handleResize());
  }

  toggleMobileMenu() {
    this.navLinks.classList.toggle("show");
    this.navOverlay.classList.toggle("show");
    document.body.style.overflow = this.navLinks.classList.contains("show")
      ? "hidden"
      : "";

    // Toggle menu icon
    this.toggleMenuIcon();
  }

  toggleMenuIcon() {
    const icon = this.mobileMenu.querySelector("i");
    if (this.navLinks.classList.contains("show")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.navLinks.classList.remove("show");
      this.navOverlay.classList.remove("show");
      document.body.style.overflow = "";

      const icon = this.mobileMenu.querySelector("i");
      icon.classList.replace("fa-times", "fa-bars");
    }
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToSection(anchor.getAttribute("href"));
      });
    });
  }

  scrollToSection(targetSelector) {
    const target = document.querySelector(targetSelector);
    const offset = 80; // Navbar height

    if (target) {
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }

  setupActiveNavigation() {
    window.addEventListener("scroll", () => {
      this.highlightActiveSection();
    });
  }

  highlightActiveSection() {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-links a");
    const offset = 100;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - offset) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          this.animateSkillBars(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section);
    });
  }

  animateSkillBars(section) {
    if (section.id === "skills") {
      const skillBars = section.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
      });
    }
  }
}
