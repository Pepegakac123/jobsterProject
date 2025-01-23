import { createJobFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const CreateJobForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof createJobFormSchema>>({
		resolver: zodResolver(createJobFormSchema),
		defaultValues: {
			position: "",
			company: "",
			jobLocation: "",
			jobStatus: "PENDING",
			jobType: "FULL_TIME",
		},
	});

	async function onSubmit(values: z.infer<typeof createJobFormSchema>) {}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 grid grid-cols-1 lg:grid-cols-3 max-w-4xl mx-auto gap-x-4 items-baseline"
				data-testid="create-job-form"
			>
				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Position <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input placeholder="Frontend Developer" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Company <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input placeholder="Google" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jobLocation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Location</FormLabel>
							<FormControl>
								<Input placeholder="Kraków" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jobStatus"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a Job Status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="PENDING" defaultChecked>
										Pending
									</SelectItem>
									<SelectItem value="REJECTED">Rejected</SelectItem>
									<SelectItem value="INTERVIEW">Interview</SelectItem>
									<SelectItem value="OFFER">Offer</SelectItem>
									<SelectItem value="ACCEPTED">Accepted</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jobType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a Job Type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="FULL_TIME" defaultChecked>
										Full-Time
									</SelectItem>
									<SelectItem value="PART_TIME">Part-Time</SelectItem>
									<SelectItem value="INTERNSHIP">Internship</SelectItem>
									<SelectItem value="REMOTE">Remote</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full self-end">
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default CreateJobForm;
