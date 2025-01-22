import { Dashboard, NotFoundPage, Landing, Register } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const routes = [
	{
		path: "/dashboard",
		element: <Dashboard />,
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
