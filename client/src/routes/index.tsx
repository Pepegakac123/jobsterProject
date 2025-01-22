import { AddJobs, NotFoundPage, Landing, Register } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { loader as DashboardLoader } from "@/components/DashboardLayout";
export const routes = [
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		loader: DashboardLoader,
		children: [
			{
				index: true,
				element: <AddJobs />,
			},
		],
	},
	{
		path: "/",
		element: <Landing />,
		index: true,
	},
	{
		path: "register",
		element: <Register />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export const router = createBrowserRouter(routes);
