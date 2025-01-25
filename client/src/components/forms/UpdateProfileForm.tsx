import { updateProfileFormSchema } from "@/schema";
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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useCreateJobMutation } from "@/store/features/jobs/jobsApiSlice";
import Loading from "../Loading";
import type { CreateJobInput } from "@/types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { updateUser } from "@/store/features/user/userSlice";

const UpdateProfileForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { user, isLoading } = useSelector((state: RootState) => state.user);

	const form = useForm<z.infer<typeof updateProfileFormSchema>>({
		resolver: zodResolver(updateProfileFormSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
			lastName: user?.lastName,
			location: user?.location,
		},
	});

	async function onSubmit(values: z.infer<typeof updateProfileFormSchema>) {
		try {
			if (user?.email.toLowerCase() === "test@mail.com") {
				toast({
					title: "Demo User can't update profile",
					variant: "destructive",
				});
				form.reset();
				return;
			}
			const resultAction = await dispatch(updateUser(values));
			if (updateUser.fulfilled.match(resultAction)) {
				toast({
					title: "Profile updated successfully",
				});
				// Jeśli wszystko poszło dobrze, wyświetl success toast
				return;
			}
			// Jeśli akcja nie jest fulfilled, rzuć błąd
			throw resultAction;
		} catch (error) {
			// Obsługa błędu z Redux Toolkit
			if (error && typeof error === "object" && "payload" in error) {
				toast({
					title: error.payload as string,
					variant: "destructive",
				});
			} else {
				// Obsługa nieoczekiwanych błędów
				toast({
					title: "An unexpected error occurred",
					variant: "destructive",
				});
			}
		}
	}

	if (isLoading) return <Loading text="Updating user profile..." />;
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 grid grid-cols-1 lg:grid-cols-3 max-w-4xl mx-auto gap-x-4 items-baseline"
				data-testid="create-job-form"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>LastName</FormLabel>
							<FormControl>
								<Input placeholder="Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="john@mail.com" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
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
				<Button type="submit" className="w-full self-end">
					Save
				</Button>
			</form>
		</Form>
	);
};
export default UpdateProfileForm;
