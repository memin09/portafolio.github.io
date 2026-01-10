const skillCards = document.querySelectorAll(".skill-card");
const aboutImg = document.querySelector(".about-img");
const aboutText = document.querySelector(".about-text");
const projectCards = document.querySelectorAll(".card");
const certItems = document.querySelectorAll(".cert-item");
const contactForm = document.querySelector(".contact");

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("skill-card")) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150);
      } else if (entry.target.classList.contains("card")) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 200);
      } else if (entry.target.classList.contains("cert-item")) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150);
      } else {
        entry.target.classList.add("show");
      }
    }
  });
}, { threshold: 0.2 });

skillCards.forEach(card => observer.observe(card));
observer.observe(aboutImg);
observer.observe(aboutText);
projectCards.forEach(card => observer.observe(card));
certItems.forEach(item => observer.observe(item));
observer.observe(contactForm);

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const frontBtn = card.querySelector('.card-front .toggle-btn');
  const backBtn = card.querySelector('.card-back .toggle-btn');
  
  if (frontBtn) {
    frontBtn.addEventListener('click', () => {
      card.classList.add('flip');
    });
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.remove('flip');
    });
  }
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
 
  document.body.style.overflowX = 'hidden';
  
  
  document.documentElement.style.overflowX = 'hidden';
  

  document.body.style.width = '100vw';
  document.documentElement.style.width = '100vw';
});


(function(){
  const track = document.querySelector('.cert-track');
  const items = Array.from(document.querySelectorAll('.cert-item'));
  const total = items.length;
  let index = 0;
  let autoplayTimer = null;
  const AUTO_MS = 3000;

  function position() {
    const W = track.clientWidth;
    const baseOffset = Math.max(100, Math.round(W * 0.25));

    items.forEach((el, i) => {
      let delta = i - index;
      const half = total / 2;
      if (delta > half) delta -= total;
      if (delta < -half) delta += total;

      const absd = Math.abs(delta);

      if (absd > 3) {
        el.style.opacity = '0';
        el.classList.add('far');
        el.style.zIndex = 0;
        el.style.transform = `translateX(calc(-50% + ${delta * baseOffset}px)) translateY(-50%) scale(0.5) rotateY(${delta<0?35:-35}deg)`;
        return;
      } else {
        el.classList.remove('far');
      }

      const offsetX = delta * baseOffset;
      const scale = delta === 0 ? 1 : Math.max(0.65, 1 - 0.15 * absd);
      const rotate = delta === 0 ? 0 : (delta<0?20:-20);
      const opacity = Math.max(0.2, 1 - 0.25 * absd);

      el.style.zIndex = 100 - absd;
      el.style.opacity = opacity;
      el.classList.toggle('is-center', delta === 0);

      el.style.transform = `translateX(calc(-50% + ${offsetX}px)) translateY(-50%) scale(${scale}) rotateY(${rotate}deg)`;
    });
  }

  function next() {
    index = (index + 1) % total;
    position();
  }

  function startAuto(){ stopAuto(); autoplayTimer=setInterval(next, AUTO_MS); }
  function stopAuto(){ if(autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer=null; } }
  function resetAuto(){ startAuto(); }

  items.forEach((el, i) => {
    el.addEventListener('click', () => {
      if(i!==index){
        index = i;
        position();
        resetAuto();
      }
    });
  });

  window.addEventListener('resize', position);

  position();
  startAuto();
})();

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnLoader = document.getElementById("btnLoader");
const modalExito = document.getElementById("modalExito");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  btnText.style.visibility = "hidden"; 
  btnLoader.style.display = "flex";    

  setTimeout(() => {
    btnLoader.style.display = "none";
    btnText.style.visibility = "visible"; 
    form.reset();
    modalExito.style.display = "flex";

    setTimeout(() => {
      modalExito.style.display = "none";
    }, 3000);

  }, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-text h1 span');
  
  
  heroTitle.style.animation = 'none';
  heroTitle.offsetHeight; 
  heroTitle.style.animation = null;
  
  if (window.innerWidth <= 400) {
    heroTitle.style.animation = 'typing 3s steps(30, end) forwards, blink .75s step-end infinite';
  }
});

window.addEventListener('resize', function() {
  const heroTitle = document.querySelector('.hero-text h1 span');
  
  if (window.innerWidth <= 400) {
   
    heroTitle.style.animation = 'typing 3s steps(30, end) forwards, blink .75s step-end infinite';
  } else if (window.innerWidth <= 768) {

    heroTitle.style.animation = 'typing 4s steps(40, end) forwards, blink .75s step-end infinite';
    heroTitle.style.whiteSpace = 'nowrap';
    heroTitle.style.overflow = 'hidden';
    heroTitle.style.borderRight = '.15em solid #005AD3';
    heroTitle.style.width = '0';
  } else {
    
    heroTitle.style.animation = 'typing 4s steps(40, end) forwards, blink .75s step-end infinite';
    heroTitle.style.whiteSpace = 'nowrap';
    heroTitle.style.overflow = 'hidden';
    heroTitle.style.borderRight = '.15em solid #005AD3';
    heroTitle.style.width = '0';
  }
});