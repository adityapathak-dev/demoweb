/* ============================================
   LOGIN.JS — Tab switching & validation
   ============================================ */

function initLoginTabs() {
  const tabs = document.querySelectorAll('.login-tab');
  const forms = document.querySelectorAll('.login-form');

  if (!tabs.length || !forms.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');
      forms.forEach(form => {
        form.classList.toggle('active', form.id === target);
      });
    });
  });
}

function initLoginForms() {
  document.querySelectorAll('.login-form form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll('input[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#EF4444';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        // Placeholder - show alert since no backend yet
        const type = form.closest('.login-form').id.includes('teacher') ? 'Teacher' : 'Student';
        alert(`${type} login will be available soon. Authentication system is coming in the next update!`);
      }
    });

    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        input.style.borderColor = '';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLoginTabs();
  initLoginForms();
});
