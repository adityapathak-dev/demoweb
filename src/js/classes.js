/* ============================================
   CLASSES.JS — Class filter tabs
   ============================================ */

function initClassFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.class-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const grade = card.getAttribute('data-grade');
        if (filter === 'all' || grade === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initClassFilter);
