// src/store/features/user/userSlice.ts
import { api } from "@/api";
import type { UserInfo } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// Definicja interfejsów
interface LoginInput {
	email: string;
	password: string;
}

interface registerInput {
	name: string;
	lastName?: string;
	email: string;
	password: string;
	location?: string;
}

interface UserState {
	isLoading: boolean;
	user: UserInfo | null;
}

const initialState: UserState = {
	isLoading: false,
	user: null,
};

export const loginUser = createAsyncThunk<UserInfo, LoginInput>(
	"user/login",
	async (credentials, thunkAPI) => {
		console.log(credentials);
		try {
			const { data }: { data: { user: UserInfo } } = await api.post(
				"/api/v1/auth/login",
				credentials,
			);
			return data.user;
		} catch (error) {
			// Typujemy error
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(
					error.response?.data?.msg || "Something went wrong",
				);
			}
			// Dla innych typów błędów
			return thunkAPI.rejectWithValue("An error occurred");
		}
	},
);

export const registerUser = createAsyncThunk<UserInfo, registerInput>(
	"user/register",
	async (credentials, thunkAPI) => {
		console.log(credentials);
		try {
			const { data }: { data: { user: UserInfo } } = await api.post(
				"/api/v1/auth/register",
				credentials,
			);
			return data.user;
		} catch (error) {
			// Typujemy error
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(
					error.response?.data?.msg || "Something went wrong",
				);
			}
			// Dla innych typów błędów
			return thunkAPI.rejectWithValue("An error occurred");
		}
	},
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			});
	},
});

export default userSlice.reducer;
