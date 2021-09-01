import { createSlice } from "@reduxjs/toolkit";

const sizesSlice = createSlice({
  name: "sizes",
  initialState: {
    sizeList: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    sizeChosen: undefined,
    resetStyles: false,
  },
  reducers: {
    chooseSize(state, action) {
      state.sizeChosen = action.payload;
    },
    resetStyles(state, action) {
      state.resetStyles = action.payload;
    },
  },
});

export const sizesActions = sizesSlice.actions;

export default sizesSlice;
