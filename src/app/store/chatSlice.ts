import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id?: string;
  sender: string;
  content: string;
  channelName: string;
  score?: number;
  label?: string;
}

interface ChatState {
  rooms: Record<string, Message[]>; // to store messages per room
}

const initialState: ChatState = {
  rooms: {}
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      if (!state.rooms[msg.channelName]) {
        state.rooms[msg.channelName] = [];
      }
      state.rooms[msg.channelName].push(msg);
    },

    clearRoom: (state, action: PayloadAction<string>) => {
      delete state.rooms[action.payload];
    },

    clearAll: () => initialState
  }
});

export const { addMessage, clearRoom, clearAll } = chatSlice.actions;
export default chatSlice.reducer;
