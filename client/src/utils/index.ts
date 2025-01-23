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

import {
	RiAddCircleLine,
	RiBriefcaseLine,
	RiBarChartLine,
	RiUserLine,
} from "react-icons/ri";

export const mobileNavLinks = [
	{
		text: "Add Job",
		path: "/dashboard",
		icon: RiAddCircleLine,
	},
	{
		text: "All Jobs",
		path: "/dashboard/jobs",
		icon: RiBriefcaseLine,
	},
	{
		text: "Stats",
		path: "/dashboard/stats",
		icon: RiBarChartLine,
	},
	{
		text: "Profile",
		path: "/dashboard/profile",
		icon: RiUserLine,
	},
];
