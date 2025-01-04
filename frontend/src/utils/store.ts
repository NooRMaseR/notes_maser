import { configureStore, createSlice }  from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "./constants";

const hasTokenSlice = createSlice({
  name: 'hasToken',
  initialState: {
    value: localStorage.getItem(ACCESS_TOKEN) !== null,
  },
  reducers: {
    setHasToken: (state, action: {payload: boolean, type: string}) => {
      state.value = action.payload;
    },
  },
});


const store = configureStore({
  reducer: {
    hasToken: hasTokenSlice.reducer,
  },
});

export const { setHasToken } = hasTokenSlice.actions;

export default store;