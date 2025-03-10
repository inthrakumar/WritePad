import { configureStore } from '@reduxjs/toolkit';
import RoomSlice from './slice/RoomSlice';
import LiveBlocksSlice from './slice/LiveBlocksRoomSlice';
export const store = configureStore({
  reducer: {
    roomDetails: RoomSlice,
    liveblocksDetails: LiveBlocksSlice,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
