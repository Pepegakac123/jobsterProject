import {
	AddJobs,
	NotFoundPage,
	Landing,
	Register,
	AllJobs,
	Stats,
	Profile,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { loader as DashboardLoader } from "@/components/DashboardLayout";
import {
	DashboardErrorElement,
	RootErrorElement,
} from "@/components/ErrorElements";
export const routes = [
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		loader: DashboardLoader,
		errorElement: <DashboardErrorElement />,
		children: [
			{
				index: true,
				element: <AddJobs />,
				errorElement: <DashboardErrorElement />,
			},
			{
				path: "jobs",
				element: <AllJobs />,
				errorElement: <DashboardErrorElement />,
			},
			{
				path: "stats",
				element: <Stats />,
				errorElement: <DashboardErrorElement />,
			},
			{
				path: "profile",
				element: <Profile />,
				errorElement: <DashboardErrorElement />,
			},
		],
	},
	{
		path: "/",
		element: <Landing />,
		index: true,
		errorElement: <RootErrorElement />,
	},
	{
		path: "register",
		element: <Register />,
		errorElement: <RootErrorElement />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
		errorElement: <RootErrorElement />,
	},
];

export const router = createBrowserRouter(routes);
