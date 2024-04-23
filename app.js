document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0); // 将滚动位置设置为顶部
  });
  function loadingInit() {
    const progress = document.querySelector(".progress");
    const percent = document.querySelector(".percent");

    count = 4;
    per = 20;
    let loading = setInterval(preload, 20);
    function preload() {
      if (count == 100 && per == 500) {
        percent.classList.add("blink");
        clearInterval(loading);
      } else {
        per += 5;
        count += 1;
        progress.style.width = per + "px";
        percent.textContent = count + "%";
      }
    }
  }
  loadingInit();

  const circleTl = gsap.timeline();
  circleTl.from(".circles", 2, {
    top: "-100%",
    ease: "elastic.out",
  });
  circleTl.to(".circle-inner", 1, {
    width: "75px",
    height: "75px",
    ease: "power4.inOut",
  });
  circleTl.to(".circle-inner-rotator", 1, {
    scale: 1,
    ease: "power4.inOut",
  });
  circleTl.to(".circles", 1.5, {
    rotation: 360,
    ease: "power4.inOut",
  });
  circleTl.to(".block", 0.75, {
    display: "block",
    height: "300px",
    ease: "power4.inOut",
  });
  circleTl.to(".block", 0.75, {
    display: "block",
    width: "800px",
    ease: "power4.inOut",
  });
  circleTl.fromTo(
    ".container",
    {
      duration: 2,
      left: "100%",
      scale: 0.5,
      ease: "power4.inOut",
    },
    {
      duration: 2,
      left: "50%",
      scale: 0.5,
      transform: "translateX(-50%)",
      ease: "power4.inOut",
      delay: 1,
    }
  );
  circleTl.to(".block", 0.75, {
    width: "0px",
    ease: "power4.inOut",
  });
  circleTl.to(".circles", 0.75, {
    rotation: 0,
    ease: "power4.inOut",
  });
  circleTl.to(".container", 1, {
    scale: 1,
    ease: "power4.inOut",
  });
  circleTl.to(".loading-page", 1.5, {
    x: -10000,
    display: "none",
    ease: "power4.inOut",
  });

  const slides = document.querySelectorAll(".slide");
  let currentSlideIndex = 0;
  let isAnimating = false;
  let currentTopValue = 0;

  const elements = [
    { selector: ".prefix", delay: 0 },
    { selector: ".names", delay: 0.15 },
    { selector: ".years", delay: 0.3 },
  ];
  slides.forEach((slide, idx) => {
    if (idx !== 0) {
      const img = slide.querySelector("img");
      gsap.set(img, { scale: 2, top: "4rem" });
    }
  });
  function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    const slide = slides[index];
    let img = slide.querySelector("img");
    currentTopValue -= 30;
    elements.forEach((elem) => {
      gsap.to(document.querySelector(elem.selector), {
        y: `${currentTopValue}px`,
        duration: 2,
        ease: "power4.inOut",
        delay: elem.delay,
      });
    });

    gsap.to(img, {
      scale: 1,
      top: "0%",
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.to(
      slide,
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          isAnimating = false;
        },
      },
      "<"
    );
  }
  function hideSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    const slide = slides[index];
    const img = slide.querySelector("img");
    currentTopValue += 30;
    elements.forEach((elem) => {
      gsap.to(document.querySelector(elem.selector), {
        y: `${currentTopValue}px`,
        duration: 2,
        ease: "power4.inOut",
        delay: elem.delay,
      });
    });
    gsap.to(slide, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 2,
      ease: "power4.inOut",
    });
    gsap.to(img, {
      scale: 2,
      top: "4rem",
      duration: 2,
      ease: "power3.inOut",
    });
    gsap.to(
      slide,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          isAnimating = false;
        },
      },
      "<"
    );
  }
  window.addEventListener("wheel", (e) => {
    if (isAnimating) return;
    if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
      showSlide(currentSlideIndex + 1);
      currentSlideIndex++;
    } else if (e.deltaY < 0 && currentSlideIndex > 0) {
      hideSlide(currentSlideIndex);
      currentSlideIndex--;
    }
  });

  let touchStartY = null;

  window.addEventListener("touchstart", (e) => {
    // 记录触摸起始位置的 Y 坐标
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener("touchmove", (e) => {
    if (isAnimating) return;

    if (touchStartY !== null) {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 0 && currentSlideIndex < slides.length - 1) {
        showSlide(currentSlideIndex + 1);
        currentSlideIndex++;
      } else if (deltaY < 0 && currentSlideIndex > 0) {
        hideSlide(currentSlideIndex);
        currentSlideIndex--;
      }

      // 重置触摸起始位置
      touchStartY = null;
    }
  });

  window.addEventListener("touchend", () => {
    // 清除触摸起始位置
    touchStartY = null;
  });

  Splitting();

  const timeline = gsap.timeline();
  timeline.from(".title-2-text .char", 1, {
    opacity: 0,
    yPercent: 120,
    stagger: 0.02,
    ease: "power4.inOut",
  });
  timeline.to(
    ".title-img",
    2,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      ease: "power3.inOut",
    },
    "-=2"
  );
  timeline.from(
    ".title-img img",
    2,
    { scale: 1.4, ease: "power3.inOut" },
    "-=2"
  );
  ScrollTrigger.create({
    trigger: ".title-2",
    start: "top center",
    end: "bottom center",
    scrub: true,
    toggleActions: "play none none none",
    animation: timeline,
    once: true,
  });
  const item = gsap.utils.toArray(".textanim-item");
  item.forEach((it) => {
    const textChar = it.querySelectorAll(".char");
    const textImg = it.querySelectorAll(".textanim-item-img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: it,
        start: "top center",
        end: "bottom bottom",

        toggleActions: "play none none play",
        scrub: 1,
      },
    });
    tl.from(textChar, 1, {
      opacity: 0,
      yPercent: 120,
      stagger: 0.05,
      ease: "power4.inOut",
    });
    tl.to(
      textImg,
      2,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1,
        ease: "power3.inOut",
      },
      "-=1"
    );
  });
});

const btnMenu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
btnMenu.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
});
