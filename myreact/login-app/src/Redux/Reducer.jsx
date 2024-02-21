import { CHANGE_TAB } from "./ActionTypes";
import { DISPLAY_PRODUCT_DETAILS } from "./ActionTypes";

const initialState = {
  activeTab: "Products",
  tabs: [],
  selectedProduct: null,
  currentPage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    case DISPLAY_PRODUCT_DETAILS:
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
