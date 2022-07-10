export const categoryFooter = (data) => {
	const footerList = document.querySelector('.footer__list');

	const list = [];

	for (const [item, key] of Object.entries(data)) {
		const li = document.createElement('li');
		li.className = 'footer__item';
		const a = document.createElement('a');
		a.className = 'footer__link';
		a.href = `/?category=${item}`;
		a.textContent = key;
		li.append(a);

		list.push(li);
	}

	footerList.append(...list);
};
