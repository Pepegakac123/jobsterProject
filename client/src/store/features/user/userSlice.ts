// src/store/features/user/userSlice.ts
import { api } from "@/api";
import type { UpdatedUser, UserInfo } from "@/types";
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from "@/utils";
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
	user: getUserFromLocalStorage(),
};

export const loginUser = createAsyncThunk<UserInfo, LoginInput>(
	"user/login",
	async (credentials, thunkAPI) => {
		try {
			const { data }: { data: { user: UserInfo } } = await api.post(
				"/api/v1/auth/login",
				credentials,
			);
			localStorage.setItem("token", data.user.token);
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
		try {
			const { data }: { data: { user: UserInfo } } = await api.post(
				"/api/v1/auth/register",
				credentials,
			);
			localStorage.setItem("token", data.user.token);
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

export const loginDemoUser = createAsyncThunk(
	"user/loginDemoUser",
	async (_, thunkAPI) => {
		try {
			const { data } = await api.post("/api/v1/auth/login", {
				email: "test@mail.com",
				password: "kTx12KL#!",
			});
			localStorage.setItem("token", data.user.token);
			return data.user;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(
					error.response?.data?.msg || "Something went wrong",
				);
			}
			return thunkAPI.rejectWithValue("An error occurred");
		}
	},
);

export const updateUser = createAsyncThunk<UserInfo, UpdatedUser>(
	"user/update",
	async (updatedUser, thunkAPI) => {
		try {
			const { data } = await api.patch("/api/v1/auth/update", updatedUser);
			return data.user;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(
					error.response?.data?.msg || "Something went wrong",
				);
			}
			return thunkAPI.rejectWithValue("An error occurred");
		}
	},
);
interface UploadResponse {
	image: {
		src: string;
	};
}
export const updateProfileImage = createAsyncThunk<UploadResponse, FormData>(
	"/upload",
	async (formData: FormData, thunkAPI) => {
		try {
			const { data } = await api.post<UploadResponse>(
				"/api/v1/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkAPI.rejectWithValue(
					error.response?.data?.msg || "Something went wrong",
				);
			}
			return thunkAPI.rejectWithValue("An error occurred");
		}
	},
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.isLoading = false;
			removeUserFromLocalStorage();
			localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(loginUser.fulfilled, (state, { payload: user }) => {
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(registerUser.fulfilled, (state, { payload: user }) => {
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
			})
			.addCase(loginDemoUser.fulfilled, (state, { payload: user }) => {
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
			})
			.addCase(loginDemoUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(loginDemoUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(updateUser.fulfilled, (state, { payload: user }) => {
				state.isLoading = false;
				state.user = user;
				addUserToLocalStorage(user);
			})
			.addCase(updateProfileImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfileImage.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(updateProfileImage.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = {
					...state.user,
					profileImage: payload.image.src,
				} as UserInfo;
			});
	},
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
