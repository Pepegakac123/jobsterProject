import { createJobFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useUpdateJobMutation } from "@/store/features/jobs/jobsApiSlice";
import Loading from "../Loading";
import type { UpdateJobInput } from "@/types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

const UpdateJobForm = ({
	job,
	setOpen,
}: {
	job: UpdateJobInput;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { toast } = useToast();
	const { user } = useSelector((state: RootState) => state.user);
	const [originalValues, setOriginalValues] =
		useState<Partial<UpdateJobInput>>(job);

	useEffect(() => {
		setOriginalValues({
			position: job.position,
			company: job.company,
			jobLocation: job.jobLocation,
			status: job.status,
			jobType: job.jobType,
		});
	}, [job]);

	const [updateJob, { isLoading }] = useUpdateJobMutation();

	const form = useForm<z.infer<typeof createJobFormSchema>>({
		resolver: zodResolver(createJobFormSchema),
		defaultValues: {
			position: job.position,
			company: job.company,
			jobLocation: job.jobLocation,
			status: job.status,
			jobType: job.jobType,
		},
	});

	async function onSubmit(values: z.infer<typeof createJobFormSchema>) {
		const changedValues = Object.keys(values).reduce(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(acc: Record<string, any>, key) => {
				const typedKey = key as keyof typeof values;
				if (values[typedKey] !== originalValues[typedKey]) {
					acc[key] = values[typedKey];
				}
				return acc;
			},
			{},
		);

		if (Object.keys(changedValues).length === 0) {
			toast({ title: "No changes made" });
			return;
		}

		try {
			await updateJob({
				id: job.id,
				job: changedValues as Partial<typeof values>,
			}).unwrap();
			setOpen(false);
			toast({ title: "Job updated successfully" });
			form.reset();
		} catch (error) {
			const err = error as FetchBaseQueryError;
			setOpen(false);

			toast({
				title:
					"data" in err
						? (err.data as { msg: string }).msg
						: "Something went wrong",
				variant: "destructive",
			});
		}
	}

	if (isLoading) return <Loading text="Updating job..." />;
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
								<Input placeholder={user?.location ?? "Kraków"} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
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
export default UpdateJobForm;
