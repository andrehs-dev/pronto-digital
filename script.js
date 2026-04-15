// NAVBAR ATIVO NO SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => observer.observe(r));

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// FAQ
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// MENU MOBILE
function toggleMenu() {
  document.getElementById('nav-mobile').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav-mobile').classList.remove('open');
}

// FECHAR MENU AO CLICAR FORA
document.addEventListener('click', function(e) {
  const mobile = document.getElementById('nav-mobile');
  const hamburger = document.getElementById('hamburger');
  if (mobile.classList.contains('open') && !mobile.contains(e.target) && !hamburger.contains(e.target)) {
    mobile.classList.remove('open');
  }
});
