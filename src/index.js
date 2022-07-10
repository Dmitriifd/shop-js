import './index.html';
import './index.scss';
import './card.html';
import './cart.html';

import { startPagination } from './modules/pagination';
import { getCategory, getGoods, getGoodsItem } from './modules/goodsService';
import { renderGoods } from './modules/renderGoods';
import { renderItem } from './modules/renderItem';
import { filter } from './modules/filter';
import { cartControl, removeToCart } from './modules/cartControl';
import { counterControl } from './modules/counterControl';
import { categoryFooter } from './modules/categoryFooter';
import { renderCart } from './modules/renderCart';

try {
	const goodsList = document.querySelector('.goods__list');

	if (goodsList) {
		const paginationWrapper = document.querySelector('.pagination');
		filter(goodsList, paginationWrapper);
		goodsList.innerHTML = `
        <div class="goods__preload">
            <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M195.883 60.1173L180.8 75.2C168.586 62.9845 152.514 55.382 135.323 53.6879C118.131 51.9938 100.885 56.3129 86.5209 65.9092C72.1572 75.5056 61.5652 89.7855 56.5498 106.316C51.5343 122.846 52.4056 140.604 59.0153 156.564C65.6249 172.524 77.564 185.698 92.7982 193.842C108.032 201.987 125.619 204.597 142.562 201.228C159.505 197.859 174.755 188.719 185.715 175.367C196.675 162.014 202.665 145.274 202.667 128H224C224 150.21 216.299 171.733 202.209 188.902C188.118 206.07 168.511 217.822 146.728 222.155C124.945 226.487 102.333 223.133 82.7453 212.663C63.1578 202.193 47.8066 185.256 39.3073 164.736C30.808 144.217 29.6865 121.385 36.1339 100.131C42.5813 78.8775 56.1987 60.5169 74.6658 48.1777C93.1329 35.8386 115.307 30.2844 137.41 32.4615C159.513 34.6386 180.178 44.4123 195.883 60.1173V60.1173Z" fill="black"/>
            </svg>
        </div>
    `;

		getGoods().then(({ goods, pages, page }) => {
			renderGoods(goodsList, goods);
			startPagination(paginationWrapper, pages, page);
			cartControl({
				wrapper: goodsList,
				classAdd: 'goods-item__cart',
				classDelete: 'goods-item__cart_remove',
			});
		});
	}
} catch (error) {
	console.warn(error);
}

try {
	const card = document.querySelector('.card');
	const swiperWrapper = document.querySelector('.recomended__slider-wrapper');

	if (card) {
		const pageURL = new URL(location);
		const id = +pageURL.searchParams.get('id') || 1;

		const preload = document.createElement('div');
		preload.innerHTML = `
            <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M195.883 60.1173L180.8 75.2C168.586 62.9845 152.514 55.382 135.323 53.6879C118.131 51.9938 100.885 56.3129 86.5209 65.9092C72.1572 75.5056 61.5652 89.7855 56.5498 106.316C51.5343 122.846 52.4056 140.604 59.0153 156.564C65.6249 172.524 77.564 185.698 92.7982 193.842C108.032 201.987 125.619 204.597 142.562 201.228C159.505 197.859 174.755 188.719 185.715 175.367C196.675 162.014 202.665 145.274 202.667 128H224C224 150.21 216.299 171.733 202.209 188.902C188.118 206.07 168.511 217.822 146.728 222.155C124.945 226.487 102.333 223.133 82.7453 212.663C63.1578 202.193 47.8066 185.256 39.3073 164.736C30.808 144.217 29.6865 121.385 36.1339 100.131C42.5813 78.8775 56.1987 60.5169 74.6658 48.1777C93.1329 35.8386 115.307 30.2844 137.41 32.4615C159.513 34.6386 180.178 44.4123 195.883 60.1173V60.1173Z" fill="black"/>
            </svg>
        `;
		preload.className = 'card__preload';

		card.append(preload);

		counterControl({
			selectorWrapper: '.card__count',
			selectorDec: '.card__btn_decrement',
			selectorInc: '.card__btn_increment',
			selectorNumber: '.card__number',
		});

		getGoodsItem(id)
			.then((item) => {
				renderItem(item);
				cartControl({
					classAdd: 'card__add-cart',
					classCount: 'card__number',
				});
				preload.remove();

				return item.category;
			})
			.then((category) => {
				return getGoods({ category });
			})
			.then(({ goods }) => {
				renderGoods(swiperWrapper, goods);
			});
	}
} catch (error) {
	console.warn(error);
}

try {
	getCategory().then((categoryList) => {
		categoryFooter(categoryList);
	});
} catch (error) {
	console.warn(error);
}

try {
	const cartGoodsList = document.querySelector('.cart-goods__list');

	if (cartGoodsList) {
		renderCart();

		cartGoodsList.addEventListener('click', (e) => {
			console.log(e.target);
			if (
				e.target.classList.contains('remove-cart') ||
				e.target.classList.contains('icon-cart') 
			) {
				removeToCart(e.target.id);
			}
		});
	}
} catch (error) {
	console.warn(error);
}
