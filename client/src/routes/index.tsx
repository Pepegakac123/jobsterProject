import { Dashboard, NotFoundPage, Landing, Register } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
		index: true,
	},
	{
		path: "landing",
		element: <Landing />,
	},
	{
		path: "register",
		element: <Register />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
