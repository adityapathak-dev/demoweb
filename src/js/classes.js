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
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initClassFilter);
