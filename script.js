const counters = document.querySelectorAll('.counter');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('#contactForm');

const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  const duration = 1200;
  const startTime = performance.now();

  const tick = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);
    element.textContent = `${currentValue}${target === 100 ? '%' : '+'}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = `${target}${target === 100 ? '%' : '+'}`;
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.querySelector('.counter')) {
          entry.target.querySelectorAll('.counter').forEach((counter) => animateCounter(counter));
        }
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

if (form && typeof window.formspree === 'function') {
  window.formspree('initForm', { formElement: '#contactForm', formId: 'xqerqaky' });
}
