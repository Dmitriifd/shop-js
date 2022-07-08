// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

import Swiper, { Thumbs, Scrollbar, Pagination } from 'swiper';
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
		spaceBetween: 44,
		slidesPerView: 3,
		scrollbar: {
			el: swiperScrollbar,
		},
		modules: [Scrollbar],
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

export const renderRecomendItems = (data) => {
	const swiperWrapper = document.querySelector('.recomended__slider-wrapper');
	const swiperPagination = document.createElement('div');
	swiperPagination.className = 'swiper-pagination';

	const el = data.goods.map((item) => {
		const swiperSlide = document.createElement('li');
		swiperSlide.className = 'swiper-slide';
		const goodsItem = document.createElement('li');
		goodsItem.className = 'goods-item';
		const goodsLink = document.createElement('a');
        goodsLink.href = `/card.html?id=${item.id}`;
		const goodsItemImage = document.createElement('img');
		goodsItemImage.className = 'goods-item__image';
		goodsItemImage.src = `${API_URL}${item.images.present}`;
		const goodsItemTitle = document.createElement('h3');
		goodsItemTitle.className = 'goods-item__title';
		goodsItemTitle.textContent = item.title;
		const goodsItemBuy = document.createElement('div');
		const goodsItemPrice = document.createElement('p');
		goodsItemPrice.textContent = item.price;
		const goodsItemCart = document.createElement('button');
		goodsItemCart.textContent = 'В корзину';
		goodsItemBuy.className = 'goods-item__buy';
		goodsItemPrice.className = 'goods-item__price';
		goodsItemCart.className = 'goods-item__cart';
        const recomendedSlider = document.querySelector('.recomended__slider');

        recomendedSlider.append(swiperPagination);
		goodsItemBuy.append(goodsItemPrice, goodsItemCart);
		goodsLink.append(goodsItemImage, goodsItemTitle);
		goodsItem.append(goodsLink, goodsItemBuy);
		swiperSlide.append(goodsItem);
		return swiperSlide;
	});

	swiperWrapper.append(...el);

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

    console.log(data);
};
