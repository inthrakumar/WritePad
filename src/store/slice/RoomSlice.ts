import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../../../convex/_generated/dataModel';

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
  initialState,
  reducers: {
    setRoomDetails: (state, action: PayloadAction<RoomState>) => {
      state.roomId = action.payload.roomId;
      state.roomConvexId = action.payload.roomConvexId;
      state.title = action.payload.title;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setRoomDetails, setTitle } = RoomSlice.actions;

export default RoomSlice.reducer;
