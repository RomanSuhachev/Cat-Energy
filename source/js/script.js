const menuBtn = document.querySelector(".page-header__toggler");
const headerMenu = document.querySelector(".page-header__list");
const sliderTogglerMobile = document.querySelector(".toggler__range");
const mobileSliderImg = document.querySelectorAll(".example__image");
const pageHeader = document.querySelector(".page__header");
let countImage = 1;

//Delete no-JS
pageHeader.classList.remove("page__header--no-JS");


//Menu Toggler

  menuBtn.addEventListener("click", () => {
    headerMenu.classList.toggle("page-header__list--opened")
  })


  //Mobile Slider toggler

  sliderTogglerMobile.addEventListener("click", () => {
    sliderTogglerMobile.classList.toggle("toggler__range--now");

    for (let i = 0; i < mobileSliderImg.length; i++) {
      mobileSliderImg[i].style.opacity = 0;
    }

    countImage++;

    if (countImage > mobileSliderImg.length) {
      countImage = 1;
    }

    mobileSliderImg[countImage - 1].style.opacity = 1;
})




