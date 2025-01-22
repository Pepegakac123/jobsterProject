import { redirect } from "react-router-dom";
import { api } from "@/api";
import { AxiosError } from "axios";
export const loader = async () => {
	const token = localStorage.getItem("token");

	if (!token) return redirect("/register");

	try {
		const { data } = await api.get("/api/v1/jobs");
		return data.jobs;
	} catch (error) {
		// Typujemy error
		if (error instanceof AxiosError) {
			return error.response?.data?.msg || "Something went wrong";
		}
		// Dla innych typów błędów
		throw error;
	}
};

const Dashboard = () => {
	return <div>Dashboard</div>;
};
export default Dashboard;
