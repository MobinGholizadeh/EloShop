import { ADD_TAB, SET_ACT_KEY, REMOVE_TAB } from "./ActionTypes";

const initialState = {
  tabList: [],
  activeKey: undefined,
};

const reducer = (state = initialState, action) => {
  //es6 arrow function
  switch (action.type) {
    case ADD_TAB:
      let key = action.key;
      if (state.tabList.findIndex((x) => x.key === key) >= 0) {
        return Object.assign({}, state, {
          activeKey: key,
        });
      }

      return {
        ...state,
        tabList: [
          ...state.tabList,
          {
            key: key,
          },
        ],
        activeKey: key,
      };
    case SET_ACT_KEY:
      return {
        ...state,
        activeKey: action.key,
      };
    case REMOVE_TAB:
      return {
        ...state,
        tabList: state.tabList.filter((x) => x.key !== action.key),
      };

    default:
      return state;
  }
};

export default reducer;
