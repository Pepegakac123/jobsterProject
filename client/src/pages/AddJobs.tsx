import { redirect } from "react-router-dom";
import { api } from "@/api";
import { AxiosError } from "axios";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const AddJobs = () => {
	return (
		<Card className="w-[90%] mx-auto mt-8 max-w-4xl shadow-animate-primary">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};
export default AddJobs;
