// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}

// Reveal on scroll using IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => io.observe(el));

// Slideshow
let slideIndex = 1;
function showSlides(n) {
  const slides = document.getElementsByClassName('slide');
  if (!slides.length) return;
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (let i = 0; i < slides.length; i++) { slides[i].style.display = 'none'; }
  slides[slideIndex - 1].style.display = 'block';
}
function plusSlides(delta) { showSlides(slideIndex += delta); }

// Wire buttons if present
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
if (prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
if (nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));

// Initialize slideshow on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
});

// Animated counters (trigger when stats becomes visible)
const counters = document.querySelectorAll('.counter');
function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
  const duration = 1200; // ms
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    counter.textContent = value + (counter.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observe stats section
const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(c => animateCounter(c));
        statsObserver.unobserve(statsSection);
      }
    });
  }, { threshold: 0.35 });
  statsObserver.observe(statsSection);
}
