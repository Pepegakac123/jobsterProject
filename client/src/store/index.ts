// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
export const store = configureStore({
	reducer: {
		user: userSlice,
	},
});

// Eksportujemy typy dla TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
