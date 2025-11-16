import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "chat",
  storage,
};

const persistedReducer = persistReducer(persistConfig, chatReducer);

export const store = configureStore({
  reducer: {
    chat: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
