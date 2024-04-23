document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
  });

  Splitting();
  const loadingTl = gsap.timeline();

  loadingTl.to(".loading-page", 2, {
    x: -6000,
    display: "none",
    delay: 0.4,
  });

  const projectTl = gsap.timeline();
  projectTl.from(".navbar", 1, {
    opacity: 0,
    y: 120,
    stagger: 0.05,
    delay: 1,
    ease: "power4.InOut",
  });
  projectTl.from(
    ".title-1 .char",
    1,
    {
      opacity: 0,
      y: 120,
      stagger: 0.05,
      ease: "power4.InOut",
    },
    "-=1"
  );
  projectTl.to(
    ".sony img",
    1,
    { opacity: 1, scale: 1.2, ease: "power4.InOut" },
    "-=2"
  );
  projectTl.fromTo(
    ".pre ",
    1,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: "power4.InOut",
    },
    "-=1"
  );
  projectTl.from(
    ".snoy-content .char",
    1,
    {
      opacity: 0,
      stagger: 0.01,
      y: 120,
      ease: "power4.InOut",
    },
    "-=1"
  );
  projectTl.from(
    ".auto-play",
    1,
    {
      opacity: 0,
      y: 120,
      ease: "power4.InOut",
    },
    "-=1"
  );

  let clone = document.querySelector(".auto-play-slider").cloneNode(true);
  document.querySelector(".auto-play").appendChild(clone);
});

const hoverSound = document.getElementById("hoverSound");

const items = Array.from(document.querySelectorAll(".items"));

items.forEach((item) => {
  const img = item.querySelector(".item-img");
  gsap.set(img, { scale: 0 });
  ScrollTrigger.create({
    trigger: img,
    start: "top center",
    end: "bottom center",
    // markers: true, // 用于调试，可以删除
    onEnter: () => {
      hoverSound.play();
    },
    toggleActions: "play none none play",
  });
});

function setScale() {
  items.forEach((item) => {
    const img = item.querySelector(".item-img");
    const rect = item.getBoundingClientRect();
    let viewportHeight = window.innerHeight;
    let itemCenter = rect.top + rect.height / 2;
    let distanceFromCenter = Math.abs(viewportHeight / 2 - itemCenter);
    let progress = distanceFromCenter / (viewportHeight / 2);
    let adjustedProgress = Math.pow(progress, 2);
    let scale = 1 - adjustedProgress * 0.5;
    scale = Math.max(0, Math.min(scale, 1));
    gsap.to(img, { scale: scale, duration: 0.1 });
  });
}

setScale();

window.addEventListener("scroll", setScale);

let scrollY = 0;
let oldScrollY = 0;
let roundedScrollY = 0;
const lerpAmount = 0.1;

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function animateScroll() {
  requestAnimationFrame(animateScroll);
  roundedScrollY = lerp(roundedScrollY, scrollY, lerpAmount);
  document.querySelector(
    ".section2"
  ).style.transform = `translate3d(0, ${-roundedScrollY}px, 0)`;
}
setScale();

window.addEventListener("scroll", (e) => {
  scrollY = e.scrollY;
});

const btnMenu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
btnMenu.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
});

const footerTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".footer",
    start: "-100 90%",
    end: "90 90%",
    toggleActions: "play none none play",
  },
});
footerTl.from(".footer", 2, {
  opacity: 0,
  y: 120,
});
