import { API_URL } from './var';

export const getGoods = ({ category } = {}) => {
	const pageURL = new URL(location);

	const url = new URL(`${API_URL}api/goods`);

	if (category) url.searchParams.append('category', category);

	for (const [name, value] of pageURL.searchParams.entries()) {
		url.searchParams.set(name, value);
	}

	return fetch(url).then((response) => response.json());
};

export const getGoodsItem = (id) =>
	fetch(`${API_URL}api/goods/${id}`).then((response) => response.json());

export const getCategory = () =>
	fetch(`${API_URL}api/category`).then((response) => response.json());

export const getGoodsList = (id) => {
	return fetch(`${API_URL}api/goods?list=${id}`).then((response) =>
		response.json()
	);
};
