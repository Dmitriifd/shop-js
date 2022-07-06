import { API_URL } from "./var";

export const getGoods = ({page}) => {
    const url = new URL(`${API_URL}api/goods`);
    fetch(url);
}