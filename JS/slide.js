var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    centerSlide: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });