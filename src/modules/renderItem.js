// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

import Swiper, { Thumbs, Scrollbar } from 'swiper';
import { API_URL } from './var';


const createCardImageSlider = (largeImages) => {
	const cardImageSlider = document.createElement('ul');
	cardImageSlider.className = 'swiper-wrapper';

	const cardImageSlides = largeImages.map((url) => {
		const li = document.createElement('li');
		li.className = 'swiper-slide';

		const img = new Image();
		img.src = `${API_URL}${url}`;
		li.append(img);
		return li;
	});

	cardImageSlider.append(...cardImageSlides);

	return cardImageSlider;
};

const createCardImageThumbSlider = (smallImages) => {
	const cardImageSlider = document.createElement('ul');
	cardImageSlider.className = 'swiper-wrapper';

	const cardImageSlides = smallImages.map((url) => {
		const li = document.createElement('li');
		li.className = 'swiper-slide';
		const button = document.createElement('button');
		button.className = 'card__thumb-btn';

		const img = new Image();
		img.src = `${API_URL}${url}`;
		button.append(img);
		li.append(button);

		return li;
	});

	cardImageSlider.append(...cardImageSlides);

	return cardImageSlider;
};

const createParams = (params) => {
	const list = [];

	for (const key in params) {
		const li = document.createElement('li');
		li.className = 'card__params-item';
		li.innerHTML = `
            <span>${key}:</span>
			<span>${params[key]}</span>
        `;

		list.push(li);
	}

	return list;
};

const createDescription = (descriptions) => {
	const list = [];

	for (const description of descriptions) {
		const p = document.createElement('p');
		p.innerHTML = description;
		list.push(p);
	}

	return list;
};

export const renderItem = (item) => {
	const cardImage = document.querySelector('.card__image');
	const cardSliderThumb = document.querySelector('.card__slider-thumb');
	const swiperScrollbar = document.createElement('div');
	swiperScrollbar.className = 'swiper-scrollbar';

	cardImage.append(createCardImageSlider(item.images.large));
	cardSliderThumb.append(
		createCardImageThumbSlider(item.images.small),
		swiperScrollbar
	);

	const cardTitle = document.querySelector('.card__title');
	const cardVendorCode = document.querySelector('.card__vandor-code');
	const cardPrice = document.querySelector('.card__price');
	const cardAddCart = document.querySelector('.card__add-cart');
	cardTitle.textContent = item.title;
	cardVendorCode.textContent = `Артикул: ${item.id}`;
	cardPrice.textContent = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	}).format(item.price);
	cardAddCart.dataset.idGoods = item.id;

	const cardParamsList = document.querySelector('.card__params-list');
	const cardDescriptionText = document.querySelector('.card__description-text');

	cardParamsList.append(...createParams(item.characteristic));
	cardDescriptionText.append(...createDescription(item.description));

	const thumbSwiper = new Swiper(cardSliderThumb, {
		spaceBetween: 15,
		slidesPerView: 3,
		scrollbar: {
			el: swiperScrollbar,
		},
		modules: [Scrollbar],

		breakpoints: {
			768: {
				spaceBetween: 20,
			},
			1024: {
				spaceBetween: 27,
				slidesPerView: 3,
			},
			1600: {
				spaceBetween: 44,
				slidesPerView: 4,
			},
			1920: {
				slidesPerView: 5,
			},
		},
	});

	new Swiper(cardImage, {
		spaceBetween: 10,
		slidesPerView: 1,
		thumbs: {
			swiper: thumbSwiper,
			slideThumbActiveClass: 'card__thumb-btn_active',
		},
		modules: [Thumbs],
	});
};
