import { API_URL } from './var';
import { counterControl } from './counterControl';
import { checkItems, removeToCart } from './cartControl';
import { addToCart } from './cartControl';

export const renderCart = (goods, cartGoods) => {
	const cartGoodsList = document.querySelector('.cart-goods__list');
	cartGoodsList.innerHTML = '';

    console.log(goods);
           
			goods.forEach((item) => {
				const li = document.createElement('li');
				li.classList.add('cart-goods__item', 'item');

				const img = new Image(200, 200);
				img.className = 'item__img';
				img.src = `${API_URL}${item.images.present}`;
				img.alt = `alt=${title}`;

				const detail = document.createElement('div');
				detail.className = 'item__detail';

				const title = document.createElement('h4');
				title.className = 'item__title';
				title.textContent = item.title;

				const vendor = document.createElement('p');
				vendor.className = 'item__vendor-code';
				vendor.textContent = `Артикул: ${item.id}`;

				const control = document.createElement('div');
				control.className = 'item__control';

				const count = document.createElement('div');
				count.className = 'item__count';
				count.dataset.idGoods = item.id;

				const dec = document.createElement('button');
				dec.className = 'item__btn item__btn_dec';
				dec.textContent = '-';

				const inc = document.createElement('button');
				inc.className = 'item__btn item__btn_inc';
				inc.textContent = '+';

				const number = document.createElement('output');
				number.className = 'item__number';
				number.value = cartGoods[item.id];

				count.append(dec, number, inc);

				const price = document.createElement('p');
				price.className = 'item__price';
				price.textContent = new Intl.NumberFormat('ru-Ru', {
					style: 'currency',
					currency: 'RUB',
					maximumFractionDigits: 0,
				}).format(item.price);

				const removeBtn = document.createElement('button');
				removeBtn.className = 'item__remove-cart';
				removeBtn.innerHTML = `
            <svg>
                <use href="#remove"></use>
            </svg>
        `;

				detail.append(title, vendor);
				control.append(count, price, removeBtn);
				li.append(img, detail, control);

				cartGoodsList.append(li);

				counterControl({
					wrapper: count,
					number: number,
					selectorDec: '.item__btn_dec',
					selectorInc: '.item__btn_inc',
				});

				count.addEventListener('click', (e) => {
					const target = e.target;

					if (target.closest('item__btn_dec, .item__btn_inc')) {
						addToCart(item.id, +number.value);
						checkItems();
					}
				});
				removeBtn.addEventListener('click', () => {
					removeToCart(item.id);
					li.remove();
					checkItems();
                    
				});
			});
};
