import { createSelector } from "@reduxjs/toolkit";

export const authUserSelector = createSelector(
  (state) => state,
  (state) => state.AuthSlice
);
