import './index.html';
import './index.scss';
import './card.html';
import './cart.html';

// import Swiper JS
import Swiper, { Thumbs, Scrollbar, Pagination } from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

const thumbSwiper = new Swiper('.card__slider-thumb', {
	spaceBetween: 44,
	slidesPerView: 3,
    scrollbar: {
        el: '.swiper-scrollbar'
    },
	modules: [Scrollbar],
});

new Swiper('.card__image', {
	spaceBetween: 10,
	slidesPerView: 1,
	thumbs: {
		swiper: thumbSwiper,
        slideThumbActiveClass: 'card__thumb-btn_active',
	},
	modules: [Thumbs],
});

new Swiper('.recomended__slider', {
	spaceBetween: 30,
	slidesPerView: 5,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
        clickable: true,
	},
	modules: [Pagination],
});
