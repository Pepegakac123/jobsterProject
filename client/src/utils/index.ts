import type { UserInfo } from "@/types";

export const addUserToLocalStorage = (user: UserInfo) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
	localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
	const result = localStorage.getItem("user");
	const user = result ? JSON.parse(result) : null;
	return user;
};
