import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomAccesses, RoomData } from '@liveblocks/node';

interface RoomState {
  LiveBlocksRoomData: RoomData | null;
}

const initialState: RoomState = {
  LiveBlocksRoomData: null,
};

export const RoomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    setLiveBlocksRoom: (state, action: PayloadAction<RoomData>) => {
      state.LiveBlocksRoomData = action.payload;
    },
    setLiveBlocksRoomUserAccess: (
      state,
      action: PayloadAction<RoomAccesses>
    ) => {
      if (state.LiveBlocksRoomData) {
        state.LiveBlocksRoomData.usersAccesses = action.payload;
      }
    },
  },
});

// Export actions
export const { setLiveBlocksRoom, setLiveBlocksRoomUserAccess } =
  RoomSlice.actions;

// Export reducer
export default RoomSlice.reducer;
