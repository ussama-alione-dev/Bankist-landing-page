let scrollBtn = document.querySelector(".scroll--to");
const section2 = document.querySelector(".section--2");

scrollBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let scrollTarget = section2.getBoundingClientRect();
  console.log(scrollTarget);
  console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, Math.trunc(window.pageYOffset));

  //   page height & width ------------>

  //   console.log(
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  //   );
  //   window.scrollTo(
  //     scrollTarget.left + window.pageXOffset,
  //     scrollTarget.top + window.pageYOffset
  //   );

  //   Old method ---->
  //   window.scrollTo({
  //     left: scrollTarget.left + window.pageXOffset,
  //     top: scrollTarget.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });
  //   Modern method ---->
  section2.scrollIntoView({ behavior: "smooth" });
});

//--------------------------------------------- Tab buttons ---------------------------------------------
let tabsContainer = document.querySelector(".section--3--btn--container");
let operationsTab = document.querySelectorAll(".operations--tab");
let tabContent = document.querySelectorAll(".operations");

tabsContainer.addEventListener("click", function (e) {
  let target = e.target.closest(".operations--tab");
  console.log(target);

  if (!target) return;

  // remove activate classes

  tabContent.forEach((tab) => tab.classList.remove("active--content"));

  operationsTab.forEach((el) => el.classList.remove("active--btn--tab"));
  // add activate classes

  document
    .querySelector(`.operation--${target.dataset.tab}`)
    .classList.add("active--content");

  target.classList.add("active--btn--tab");
});

// -------------------------------------------Page navigation-------------------------------------------
// method I
// let links = document.querySelectorAll(".nav--links");
// links.forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("link");
//     console.log("link clicked");
//     const CLASS = this.getAttribute("href");
//     document.querySelector(CLASS).scrollIntoView({ behavior: "smooth" });
//   });
// });
// method II
document.querySelector(".nav--links").addEventListener("click", function (e) {
  e.preventDefault();
  let Target = e.target;
  console.log(Target, Target.getAttribute("href"));
  if (Target.classList.contains("nav--link")) {
    console.log("link");
    document
      .querySelector(Target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    // Target.classList.add("active-link");
  }
});

// ----------------------------------------------Login Btns----------------------------------------------
// document.querySelector("#overlay").style.opacity = 0;
// document.querySelector("h1").style.zIndex = -100;
// document.querySelector("#overlay").classList.add("hidden");

// let slide = document.querySelector(".left--arrow");
// slide.addEventListener("click", function () {
//   document.querySelector(".content--1").style.transform = "translateX(100px)";
// });
// <------------------------------------------------------------------------------------------------------->
let nav = document.querySelector(".nav");
const handlerHover = function (e) {
  if (e.target.classList.contains("nav--link")) {
    let target = e.target;
    let link = target.closest(".nav").querySelectorAll(".nav--link");
    let img = target.closest(".nav").querySelector(".nav--logo");

    link.forEach((el) => {
      if (el != target) {
        // console.log("you got it !");
        el.style.opacity = this;
        img.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", handlerHover.bind(0.5));
nav.addEventListener("mouseout", handlerHover.bind(1));
// <-------------------------------------------------------------------------------------------------------->\
// let cordinate = document.querySelector(".section--3").getBoundingClientRect();
// console.log(cordinate);
// window.addEventListener("scroll", function () {
//   if (cordinate.top < this.scrollY) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// --------------------------------------------------------API oberver

// const observerCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const Obsoptions = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(observerCallBack, Obsoptions);
// observer.observe(section2);
// --------------------------------------

// console.log(
//   document.querySelector(".section--2").getBoundingClientRect().bottom
// );

let arrowUp = document.querySelector(".arrow-up");
// const ArrowUpDisplayer = function () {
//   if (
//     document.querySelector(".section--2").getBoundingClientRect().bottom < 0
//   ) {
//     console.log("you got it!");
//     arrowUp.classList.remove("hide-arrow");
//   } else {
//     arrowUp.classList.add("hide-arrow");
//   }
// };
// ArrowUpDisplayer();

let sec1 = document.querySelector(".section--1");
// //
// // let arrowUPSections = document.querySelectorAll(".ArrowUpDisplayer");
// let arrowUPSections = document.querySelectorAll(".sec");
// // console.log(arrowUPSections);
const arrow = function (entries) {
  const [entry] = entries; // ==  entries [0]
  console.log(entry);
  // console.log(window)
  // tomorrow remember to work with target.getBudingsectionRect().top
  // console.log(entry.intersectionRatio);
  console.log(sec1.getBoundingClientRect().bottom);
  // console.log(sec3.boundingClientRect().top);
  if (sec1.getBoundingClientRect().bottom > 0) {
    arrowUp.classList.add("hide-arrow");
  } else {
    arrowUp.classList.remove("hide-arrow");
  }
};
const arrowObserver = new IntersectionObserver(arrow, {
  root: null,
  threshold: 0,
});
// arrowUPSections.forEach((sec) => {
//   arrowObserver.observe(sec);
// });
arrowObserver.observe(sec1);

arrowUp.addEventListener("click", function () {
  if (!arrowUp.classList.contains("hide--arrow")) {
    document
      .querySelector(".section--1")
      .scrollIntoView({ behavior: "smooth" });
    console.log(arrowUp);
  }
});

// -----------------------------
let header = document.querySelector(".section--1");
let navHeight;
const stickyNav = function (entries) {
  const [entry] = entries; // ==  entries [0]
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  //  mine => threshold: nav.getBoundingClientRect().height / 1000,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

// -------------------------------------

// ----------------------------------------------------------------------
// we create first the logic of function  I
const revealSections = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden--section");

  // active link

  console.log(entry.target.dataset.num);
  // let activeLink = document.querySelector(`.link--${entry.target.dataset.num}`);
  // let AllLinks = document.querySelectorAll(".nav--link");
  // AllLinks.forEach((link) => link.classList.remove("active-link"));
  // console.log("=>" + AllLinks.length);
  // console.log(activeLink);
  // activeLink.classList.add("active-link");
  // observer.unobserve(entry.target);
  //   let AllLinks = document.querySelectorAll("#links");
  //   AllLinks.forEach((link) => {
  //     link.classList.remove("active-link");
  //   });
  //   document
  //     .querySelector(`.link--${entry.target.dataset.num}`)
  //     .classList.add("active-link");
};
// and we append this function into IntersectionObserverAPI

const SectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});
// and we loop over elements
let allSections = document.querySelectorAll(".section");
allSections.forEach(function (section) {
  SectionObserver.observe(section);
  section.classList.add("hidden--section"); // remember
});
// --------------------------------------------------------active Link
const obssections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  console.log(entry.target.dataset.num);

  let AllLinks = document.querySelectorAll("#links");
  AllLinks.forEach((link) => {
    link.classList.remove("active-link");
  });
  document
    .querySelector(`.link--${entry.target.dataset.num}`)
    .classList.add("active-link");
};

const sectionsObs = new IntersectionObserver(obssections, {
  root: null,
  threshold: 0.15,
});
let sections = document.querySelectorAll(".section");
allSections.forEach(function (section) {
  sectionsObs.observe(section);
});

// -------------------------------------------------
let TargetImgs = document.querySelectorAll("img[data-src]");
const LoadImgs = function (entries, observer) {
  [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  console.log(entry.target.dataset.src);
  console.log(entry.target.src);
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy--img");
    entry.target.classList.add("new--img");
  });
  observer.unobserve(entry.target);
};
// console.log(TargetImgs[0]);
const imgsObserver = new IntersectionObserver(LoadImgs, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
TargetImgs.forEach(function (img) {
  imgsObserver.observe(img);
});

// ----------------------------------------------- Slider
const Slider = function () {
  let slides = document.querySelectorAll(".slide");

  let Curret_slide = 0;
  let maxSlide = slides.length;

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("active-dot"));
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active-dot");
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (el, index) =>
        (el.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };
  gotoSlide(0);

  const gotoRight = function () {
    if (Curret_slide == maxSlide - 1) {
      Curret_slide = 0;
    } else {
      Curret_slide++;
    }
    gotoSlide(Curret_slide);
    activateDot(Curret_slide);
  };

  const gotoLeft = function () {
    if (Curret_slide == 0) {
      Curret_slide = maxSlide - 1;
    } else {
      Curret_slide--;
    }
    gotoSlide(Curret_slide);
    activateDot(Curret_slide);
  };

  let slide_left_btn = document.querySelector(".left-btn");
  let slide_right_btn = document.querySelector(".right-btn");
  slide_right_btn.addEventListener("click", gotoRight);
  slide_left_btn.addEventListener("click", gotoLeft);

  // ------------------------------------------------
  let dotsContainer = document.querySelector(".dots");
  const CreateDots = function () {
    slides.forEach(function (_, index) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <button class = "dot" data-slide =${index}></button>
      `
      );
    });
  };
  CreateDots();

  dotsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("dot")) {
      // let slide = event.target.dataset.slide; // case I
      let { slide } = event.target.dataset; // case II
      console.log(event.target.dataset);
      gotoSlide(slide);
      activateDot(slide);
    }
  });
  activateDot(0);
  // ------------------------------------------------
  document.addEventListener("keydown", function (event) {
    const x = function (entries, observer) {
      [entry] = entries;
      if (!entry.isIntersecting) return;
      if (event.code === "ArrowRight") gotoRight();
      if (event.code === "ArrowLeft") gotoLeft();
    };

    const api = new IntersectionObserver(x, { root: null, threshold: 0 });

    api.observe(document.querySelector(".section--4"));
  });
};
Slider();

// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   console.log(event);
//   event.returnValue = "";
// });
