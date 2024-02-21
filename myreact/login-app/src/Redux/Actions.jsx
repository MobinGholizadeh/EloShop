import { CHANGE_PAGE } from "./ActionTypes";
import { CHANGE_TAB } from "./ActionTypes";
import { DISPLAY_PRODUCT_DETAILS } from "./ActionTypes";

export const changeTab = (tab) => ({
  type: CHANGE_TAB,
  payload: tab,
});

export const displayProductDetails = (product) => ({
  type: DISPLAY_PRODUCT_DETAILS,
  payload: product,
});
