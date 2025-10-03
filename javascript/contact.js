// Contact form functionality - FIXED VERSION
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
    this.debugFormFields(); // ✅ DEBUG: Untuk memeriksa field form
  }

  initializeEmailJS() {
    if (typeof emailjs !== "undefined") {
      emailjs.init(this.emailjsPublicKey);
      console.log("✅ EmailJS initialized with key:", this.emailjsPublicKey);
    } else {
      console.error("❌ EmailJS library not loaded");
    }
  }

  setupFormSubmission() {
    if (this.contactForm) {
      console.log("✅ Contact form found:", this.contactForm);
      this.contactForm.addEventListener("submit", (e) => {
        this.handleFormSubmit(e);
      });
    } else {
      console.error("❌ Contact form not found!");
    }
  }

  // ✅ DEBUG: Method untuk memeriksa field form
  debugFormFields() {
    if (this.contactForm) {
      const fields = ['name', 'email', 'subject', 'message'];
      fields.forEach(field => {
        const element = this.contactForm.querySelector(`[name="${field}"]`);
        console.log(`Field ${field}:`, element ? "FOUND" : "NOT FOUND");
      });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    console.log("🔄 Form submission started...");

    // ✅ FIX: Validasi setelah mendapatkan data yang benar
    const formData = this.getFormData();
    console.log("📦 Form data:", formData);

    if (!this.validateForm(formData)) {
      return;
    }

    const submitBtn = this.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    this.setButtonState(submitBtn, "Mengirim...", true);

    try {
      console.log("📤 Sending to EmailJS...");
      
      // ✅ FIX: Gunakan this.contactForm langsung
      const result = await emailjs.sendForm(
        this.emailjsServiceID,
        this.emailjsTemplateID,
        this.contactForm
      );
      
      console.log("✅ EmailJS Success:", result);
      
      // Redirect to thank you page on success
      window.location.href = "thankyou.html";
      
    } catch (error) {
      console.error("❌ EmailJS Error Details:", error);
      this.handleFormError(error);
    } finally {
      // Reset button state
      this.setButtonState(submitBtn, originalText, false);
    }
  }

  // ✅ ALTERNATIF LEBIH SIMPLE:
getFormData() {
  if (!this.contactForm) return {};
  
  return {
    name: this.contactForm.querySelector('[name="name"]')?.value.trim() || '',
    email: this.contactForm.querySelector('[name="email"]')?.value.trim() || '',
    subject: this.contactForm.querySelector('[name="subject"]')?.value.trim() || '',
    message: this.contactForm.querySelector('[name="message"]')?.value.trim() || ''
  };
}

  validateForm(formData) {
    console.log("🔍 Validating form data:", formData);

    if (!this.checkRequiredFields(formData)) {
      alert("Harap isi semua field yang wajib diisi.");
      return false;
    }

    if (!this.isValidEmail(formData.email)) {
      alert("Harap masukkan email yang valid.");
      return false;
    }

    console.log("✅ Form validation passed");
    return true;
  }

  checkRequiredFields(formData) {
    const isValid = formData.name && formData.email && formData.subject && formData.message;
    console.log("📋 Required fields check:", isValid, formData);
    return isValid;
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
    let errorMessage = "❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.";
    
    // ✅ Detailed error handling
    if (error.text) {
      console.error("📧 EmailJS Error Response:", error.text);
    }
    
    if (error.status) {
      console.error("🔢 Error Status:", error.status);
    }
    
    alert(errorMessage);
  }
}

// ✅ Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  new ContactFormManager();
});