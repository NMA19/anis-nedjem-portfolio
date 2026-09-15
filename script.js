const revealItems = document.querySelectorAll('.reveal');
const cursorGlow = document.querySelector('.cursor-glow');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.desktop-nav');
let pointerFrame;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
  observer.observe(item);
});

document.addEventListener('pointermove', (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;

  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    const x = (event.clientX / window.innerWidth - 0.5) * 90;
    const y = (event.clientY / window.innerHeight - 0.5) * 70;
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  });
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('mobile-open', !isOpen);
  menuButton.textContent = isOpen ? 'Menu' : 'Close';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  });
});
