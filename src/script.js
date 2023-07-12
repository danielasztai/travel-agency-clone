'use strict';

const slides = document.querySelectorAll('.slide-img');
const sliderContainer = document.querySelector('.img-slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const stickyNav = document.querySelector('.sticky-nav');
const navContainer = document.querySelector('.container');
const hotelDropdownImg = document.querySelector('.hotel-dropdown-img');
const dropdown = document.querySelector('.dropdown');
const dropdownBox = document.querySelector('.hidden-box');
const galleryImg = document.querySelectorAll('.gallery-img');
const galleryBlur = document.querySelector('.gallery-blur');
const galleryFullscreenImg = document.querySelector('.gallery-fullscreen-img');
const visaCheckFrom = document.querySelector('.input-from');
const visaCheckTo = document.querySelector('.input-to');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const closeNav = document.querySelector('.nav-close');
const mobileNavItems = document.querySelectorAll('.mobile-nav-items');

// Nav dropdown

// Image slideshow
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const goToSlide = function () {
    slides.forEach(
      s => (s.style.transform = `translateX(-${100 * curSlide}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide();
  };

  const autoSliding = function () {
    setInterval(timer, 30000);
    function timer() {
      nextSlide();
    }
  };
  autoSliding();
};

slider();

// Sticky nav
const stickyNavFunc = function () {
  const navCallback = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      stickyNav.classList.remove('hidden');
      dropdown.style.display = 'none';
    }
    if (entry.isIntersecting) stickyNav.classList.add('hidden');
  };

  const navObserver = new IntersectionObserver(navCallback, {
    root: null,
    threshold: 0.6,
  });
  navObserver.observe(navContainer);

  // Dropdowns
  hotelDropdownImg.addEventListener('mouseover', function () {
    dropdown.style.display = 'flex';
  });

  dropdown.addEventListener('mouseover', function () {
    dropdown.style.display = 'flex';
  });

  // Dropdown quit
  dropdown.addEventListener('mouseout', function () {
    dropdown.style.display = 'none';
  });
};

stickyNavFunc();

// Display gallery images on the fullscreen
const zoomGallery = function () {
  galleryImg.forEach(e =>
    e.addEventListener('click', function (e) {
      // galleryBlur.classList.remove('hidden');
      galleryBlur.style.display = 'grid';
      galleryBlur.style.alignItems = 'center';
      galleryBlur.style.justifyContent = 'center';

      galleryFullscreenImg.style.backgroundImage = `url(${e.target.src})`;
      galleryFullscreenImg.style.display = 'block';
    })
  );

  // Close the popup if clicking on the screen
  galleryBlur.addEventListener('click', function () {
    galleryBlur.style.display = 'none';
  });
};

zoomGallery();

// Getting countries for visa check
fetch('https://restcountries.com/v3.1/all')
  .then(res =>
    res.json().then(res => {
      let outputFrom = '';
      let outputTo = '';
      res.forEach(country => {
        outputFrom += `<option value="${country.name.official}">${country.name.official}, ${country.cca2}</option>\n`;
        outputTo += `<option value="${country.name.official}">${country.name.official}, ${country.cca2}</option>\n`;
      });
      visaCheckFrom.innerHTML = outputFrom;
      visaCheckTo.innerHTML = outputTo;
    })
  )
  .catch(err => console.log(err));

// Opening mobile navigation
hamburger.addEventListener('click', function () {
  mobileNav.style.display = 'flex';
});

// Closing mobile navigation if clicking on X
closeNav.addEventListener('click', function () {
  mobileNav.style.display = 'none';
});

// Closing mobile navigation if clicking on any menu point
mobileNavItems.forEach(item =>
  item.addEventListener('click', function () {
    mobileNav.style.display = 'none';
  })
);
