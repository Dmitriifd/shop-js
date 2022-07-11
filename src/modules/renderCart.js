import { checkItems } from './cartControl';
import { getGoodsCart } from './goodsService';
import { API_URL } from './var';

const renderGoods = (data = []) => {
	const wrapper = document.querySelector('.cart-goods__list');
	const total = document.querySelector('.total__row_count');

	if (wrapper) {
		wrapper.innerHTML = '';

		if (data.length) {
			data.forEach(({ price, title, id, images }) => {
				wrapper.innerHTML += `
            <li class="cart-goods__item item">
            <img class="item__img" src="${API_URL}${images.present}" alt=${title} />
            <div class="item__detail">
                <h4 class="item__title">${title}</h4>
                <p class="item__vendor-code">Артикул: ${id}</p>
            </div>
            <div class="item__control">
                <div class="item__count">
                    <button class="item__btn item__btn_dec">-</button>
                    <output class="item__number">1</output>
                    <button class="item__btn item__btn_inc">+</button>
                </div>
                <p class="item__price">${price} ₽</p>
                <button class="item__remove-cart" aria-label="удалить товар">
                    <svg class="icon-cart" data-id=${id}>
                        <use class="remove-cart" data-id=${id} href="#remove"></use>
                    </svg>
                </button>
            </div>
        </li>
        `;
			});

           const sum =  data.reduce((acc, item) => {
                console.log(acc + item.price);
                return acc + item.price
            }, 0)

            total.textContent = sum;

            console.log(sum);
		} else {
			wrapper.innerHTML = 'корзина пуста';
		}
	}
};

export const renderCart = () => {
	const localStorageGoods = JSON.parse(localStorage.getItem('cart-ts'));

	const array = [];

	Object.entries(localStorageGoods).map(([id]) => {
		return array.push(id);
	});

	getGoodsCart(array).then((data) => {
		renderGoods(data);
		checkItems();
	});
};
