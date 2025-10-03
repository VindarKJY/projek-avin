// Contact form functionality
class ContactFormManager {
  constructor() {
    this.contactForm = document.querySelector(".contact-form");
    this.emailjsPublicKey = "l2U2d4U4QjR9IFDgo";
    this.emailjsServiceID = "service_b4ppces";
    this.emailjsTemplateID = "template_aq8gj79";

    this.init();
  }

  init() {
    this.initializeEmailJS();
    this.setupFormSubmission();
  }

  initializeEmailJS() {
    if (typeof emailjs !== "undefined") {
      emailjs.init(this.emailjsPublicKey);
    } else {
      console.error("EmailJS library not loaded");
    }
  }

  setupFormSubmission() {
    if (this.contactForm) {
      this.contactForm.addEventListener("submit", (e) => {
        this.handleFormSubmit(e);
      });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    if (!this.validateForm(this.contactForm)) {
      return;
    }

    const submitBtn = this.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    this.setButtonState(submitBtn, "Mengirim...", true);

    try {
      await emailjs.sendForm(
        this.emailjsServiceID,
        this.emailjsTemplateID,
        this.contactForm
      );

      // Redirect to thank you page on success
      window.location.href = "thankyou.html";
    } catch (error) {
      this.handleFormError(error);
    } finally {
      // Reset button state
      this.setButtonState(submitBtn, originalText, false);
    }
  }

  validateForm(form) {
    const formData = this.getFormData(form);

    if (!this.checkRequiredFields(formData)) {
      alert("Harap isi semua field yang wajib diisi.");
      return false;
    }

    if (!this.isValidEmail(formData.email)) {
      alert("Harap masukkan email yang valid.");
      return false;
    }

    return true;
  }

  getFormData(form) {
    return {
      name: form.querySelector("#name").value.trim(),
      email: form.querySelector("#email").value.trim(),
      subject: form.querySelector("#subject").value.trim(),
      message: form.querySelector("#message").value.trim(),
    };
  }

  checkRequiredFields(formData) {
    return (
      formData.name && formData.email && formData.subject && formData.message
    );
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  setButtonState(button, text, disabled) {
    button.textContent = text;
    button.disabled = disabled;
  }

  handleFormError(error) {
    alert(
      "❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp."
    );
    console.error("EmailJS Error:", error);
  }
}
