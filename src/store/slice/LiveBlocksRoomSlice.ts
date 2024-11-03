import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomData } from '@liveblocks/node';

// Define the initial state interface
interface RoomState {
  LiveBlocksRoomData: RoomData | null;
}

// Set the initial state
const initialState: RoomState = {
  LiveBlocksRoomData: null,
};

// Create the slice
export const RoomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    // Define reducer to update room data
    getLiveBlocksRoom: (state, action: PayloadAction<RoomData>) => {
      state.LiveBlocksRoomData = action.payload;
    },
  },
});

// Export the action
export const { getLiveBlocksRoom } = RoomSlice.actions;

// Export the reducer as default
export default RoomSlice.reducer;
