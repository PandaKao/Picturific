// swiper button click using swiper js
const swiperEl = document.querySelector('swiper-container');
const buttonEl = document.querySelector('button');

buttonEl.addEventListener('click', () => {
    swiperEl.swiper.slideNext();
});