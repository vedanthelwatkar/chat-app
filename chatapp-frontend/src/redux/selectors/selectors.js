import { createSelector } from "@reduxjs/toolkit";

export const authUserSelector = createSelector(
  (state) => state,
  (state) => state.AuthSlice
);

export const getUsersSelector = createSelector(
  (state) => state,
  (state) => state.GetUsers
);

export const messageSelector = createSelector(
  (state) => state,
  (state) => state.MessageSlice
);

export const inviteUserSelector = createSelector(
  (state) => state,
  (state) => state.InviteUserSlice
);
