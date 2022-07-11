import { API_URL } from './var';

import Swiper, { Pagination } from 'swiper';
import { cartControl } from './cartControl';

export const renderGoods = (wrapper, goods) => {
	wrapper.textContent = '';

	if (!goods.length) {
		wrapper.innerHTML = `
            <h2 class="search__title">По вашему запросу нет товаров </h2>
        `;
	}

	const pageURL = new URL(location);
	const id = +pageURL.searchParams.get('id') || 1;

	const newGoods = goods.filter((item) => item.id != id);

	const cards = newGoods.map((item) => {
		const li = document.createElement('li');
		li.className = 'goods__item swiper-slide';
		li.innerHTML = /*html*/ `
            <article class='goods-item'>
				<a class='goods-item__link' href='card.html?id=${item.id}'>
					<img
						class='goods-item__image'
						src=${API_URL + item.images.present}
						alt=${item.title}
                        width="340"
                        height="340"
					/>
					<h3 class='goods-item__title'>${item.title}</h3>
				</a>

				<div class='goods-item__buy'>
					<p class='goods-item__price'>${item.price}</p>
					<button class='goods-item__cart' data-id-goods=${item.id}>В корзину</button>
				</div>
			</article>
        `;

		return li;
	});

	wrapper.append(...cards);

	new Swiper('.recomended__slider', {
		spaceBetween: 10,
		slidesPerView: 2,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		modules: [Pagination],
		breakpoints: {
			521: {
				slidesPerView: 1.5,
			},
			620: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			},
			1600: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			1920: {
				slidesPerView: 5,
			},
		},
	});

	cartControl({
		wrapper,
		classAdd: 'goods-item__cart',
		classDelete: 'goods-item__cart_remove',
	});
};
