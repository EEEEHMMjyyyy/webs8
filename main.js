// Bubble generator
const ocean = document.querySelector('.ocean-bg');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = Math.random() * 40 + 10 + 'px';
  bubble.style.width = size;
  bubble.style.height = size;
  bubble.style.left = Math.random() * 100 + '%';
  bubble.style.animationDuration = Math.random() * 10 + 6 + 's';
  ocean.appendChild(bubble);
  setTimeout(() => bubble.remove(), 15000);
}
setInterval(createBubble, 400);

// Scroll-based background darkening
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
  const oceanBg = document.querySelector('.ocean-bg');
  const startColor = [224, 247, 255]; // #e0f7ff
  const endColor = [0, 8, 20]; // #000814
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scrollPercent);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scrollPercent);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scrollPercent);
  oceanBg.style.background = `linear-gradient(to bottom, rgb(${r}, ${g}, ${b}), #001f33 50%, #000814 100%)`;
});

// Custom Smooth Scrolling Function with adjustable duration
function smoothScrollTo(element, duration = 1500) {
  const targetPosition = element.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Smooth Scrolling for Navigation Links and Dive In button
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        smoothScrollTo(targetSection, 3000);
      }
    });
  });

  const diveInButton = document.querySelector('#home .btn');
  if (diveInButton) {
    diveInButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.getElementById('stream-design');

      if (targetSection) {
        smoothScrollTo(targetSection, 2500);
      }
    });
  }
});

// Pop-up functionality
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quarter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const popupId = btn.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.add('active');
      }
    });
  });

  document.querySelectorAll('.close-popup').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.remove('active');
    });
  });
});
