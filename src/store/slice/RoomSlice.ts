import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../../../convex/_generated/dataModel';

// Define a type for the slice state
interface RoomState {
  roomId: string | null;
  roomConvexId: Id<'userRecords'> | null;
  title: string | null;
}

// Define the initial state using that type
const initialState: RoomState = {
  roomId: null,
  roomConvexId: null,
  title: null,
};

export const RoomSlice = createSlice({
  name: 'roomSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRoomDetails: (state, action: PayloadAction<RoomState>) => {
      state.roomId = action.payload.roomId;
      state.roomConvexId = action.payload.roomConvexId;
      state.title = action.payload.title;
    },
  },
});

export const { setRoomDetails } = RoomSlice.actions;

export default RoomSlice.reducer;
