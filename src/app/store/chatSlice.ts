import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id?: number;           // Real DB id (if provided later)
  clientId?: string;     // Temp unique ID from frontend
  sender: string;
  content: string;
  channelName: string;
  score?: number;
  label?: string;
  timestamp?: string;    // Optional: for future sorting
}

interface ChatState {
  rooms: Record<string, Message[]>;
}

const initialState: ChatState = {
  rooms: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      const room = msg.channelName;

      if (!state.rooms[room]) {
        state.rooms[room] = [];
      }

      // PREVENT DUPLICATES – Super Robust Check
      const alreadyExists = state.rooms[room].some((m) => {
        // 1. Real database ID (most reliable)
        if (m.id != null && msg.id != null) {
          return m.id === msg.id;
        }

        // 2. Client-generated temporary ID
        if (m.clientId && msg.clientId) {
          return m.clientId === msg.clientId;
        }

        // 3. Fallback: exact same sender + content + channel (very rare collision)
        return (
          m.sender === msg.sender &&
          m.content === msg.content &&
          m.channelName === msg.channelName
        );
      });

      if (!alreadyExists) {
        state.rooms[room].push(msg);
      }
    },

    clearRoom: (state, action: PayloadAction<string>) => {
      delete state.rooms[action.payload];
    },

    clearAll: () => initialState,
  },
});

export const { addMessage, clearRoom, clearAll } = chatSlice.actions;
export default chatSlice.reducer;