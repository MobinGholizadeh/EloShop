import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";

const store = configureStore({
  reducer: reducer,
});

export default store;
