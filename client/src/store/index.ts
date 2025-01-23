// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import { jobsApiSlice } from "./features/jobs/jobsApiSlice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		[jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(jobsApiSlice.middleware),
});

// Eksportujemy typy dla TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
