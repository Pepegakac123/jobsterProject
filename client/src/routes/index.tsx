import { Dashboard, NotFoundPage, Landing, Register } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { loader as DashboardLoader } from "@/pages/Dashboard";
import DashboardLayout from "@/components/DashboardLayout";
export const routes = [
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		loader: DashboardLoader,
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
