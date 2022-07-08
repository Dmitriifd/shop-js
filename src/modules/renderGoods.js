import { API_URL } from './var';

import Swiper, { Pagination } from 'swiper';

export const renderGoods = (wrapper, goods) => {
	wrapper.textContent = '';
	const recomendedSlider = document.querySelector('.recomended__slider');
	if (recomendedSlider) {
		const swiperPagination = document.createElement('div');
		swiperPagination.className = 'swiper-pagination';
		recomendedSlider.append(swiperPagination);
	}

	const cards = goods.map((item) => {
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
};
