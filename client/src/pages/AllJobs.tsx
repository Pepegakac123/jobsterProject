import QueryJobsForm from "@/components/forms/QueryJobsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateJobForm from "@/components/forms/CreateJobForm";
const AllJobs = () => {
	return (
		<Card className="w-[90%] mx-auto mt-8 max-w-4xl shadow-animate-primary">
			<CardHeader>
				<CardTitle>Search Jobs</CardTitle>
			</CardHeader>
			<CardContent>
				<QueryJobsForm />
			</CardContent>
		</Card>
	);
};
export default AllJobs;
