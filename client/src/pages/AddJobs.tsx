import { redirect } from "react-router-dom";
import { api } from "@/api";
import { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateJobForm from "@/components/forms/CreateJobForm";

const AddJobs = () => {
	return (
		<Card className="w-[90%] mx-auto mt-8 max-w-4xl shadow-animate-primary">
			<CardHeader>
				<CardTitle>Add Job</CardTitle>
			</CardHeader>
			<CardContent>
				<CreateJobForm />
			</CardContent>
		</Card>
	);
};
export default AddJobs;
