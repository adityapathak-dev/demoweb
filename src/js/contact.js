/* ============================================
   CONTACT.JS — Form validation
   ============================================ */

function initContactForm() {
  const form = document.getElementById('contact-form');
  const formContainer = document.getElementById('form-container');
  const successMessage = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#contact-name');
    const phone = form.querySelector('#contact-phone');
    const studentClass = form.querySelector('#contact-class');
    const subject = form.querySelector('#contact-subject');

    let isValid = true;

    [name, phone, studentClass, subject].forEach(field => {
      if (!field) return;
      if (!field.value.trim()) {
        field.style.borderColor = '#EF4444';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    // Phone validation
    if (phone && phone.value.trim()) {
      const phoneClean = phone.value.replace(/[\s\-\(\)]/g, '');
      if (!/^\+?\d{10,13}$/.test(phoneClean)) {
        phone.style.borderColor = '#EF4444';
        isValid = false;
      }
    }

    if (!isValid) return;

    // Show success (no backend yet)
    if (formContainer) formContainer.style.display = 'none';
    if (successMessage) successMessage.classList.add('show');
  });

  // Clear error styling on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
