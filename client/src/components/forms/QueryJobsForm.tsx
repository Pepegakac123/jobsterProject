import { QueryJobsFormSchema } from "@/schema";
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

const QueryJobsForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof QueryJobsFormSchema>>({
		resolver: zodResolver(QueryJobsFormSchema),
		defaultValues: {
			search: "",
			jobStatus: "all",
			jobType: "all",
			sort: "latest",
		},
	});

	async function onSubmit(values: z.infer<typeof QueryJobsFormSchema>) {}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 grid grid-cols-1 lg:grid-cols-3 max-w-4xl mx-auto gap-x-4 items-baseline"
				data-testid="search-job-form"
			>
				<FormField
					control={form.control}
					name="search"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Search</FormLabel>
							<FormControl>
								<Input placeholder="Frontend Developer Or Google" {...field} />
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
									<SelectItem value="all" defaultChecked>
										All
									</SelectItem>
									<SelectItem value="PENDING">Pending</SelectItem>
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
									<SelectItem value="all" defaultChecked>
										All
									</SelectItem>
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
				<FormField
					control={form.control}
					name="sort"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sort</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a sorting method" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="latest" defaultChecked>
										Latest
									</SelectItem>
									<SelectItem value="oldest" defaultChecked>
										Oldest
									</SelectItem>
									<SelectItem value="a-z">A-Z</SelectItem>
									<SelectItem value="z-a">Z-A</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-8 self-end w-full lg:col-span-2">
					<Button type="submit" className="w-full self-end">
						Apply Filters
					</Button>
					<Button type="button" className="w-full self-end">
						Reset Search Values
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default QueryJobsForm;
