import { registerFormSchema } from "@/schema";
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
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import type { AppDispatch, RootState } from "@/store";
import { registerUser } from "@/store/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const { toast } = useToast();
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			lastName: "",
			location: "",
		},
	});
	async function onSubmit(values: z.infer<typeof registerFormSchema>) {
		const loadingTimeout = setTimeout(() => {
			if (isLoading) {
				toast({
					title: "Please be patient",
					description:
						"Due to free hosting, initial connection may take up to 30 seconds while the server is starting up. Your request is being processed...",
				});
			}
		}, 3000);
		try {
			const resultAction = await dispatch(registerUser(values));
			if (registerUser.fulfilled.match(resultAction)) {
				clearTimeout(loadingTimeout);

				toast({
					title: "Registered in successfully",
				});
				navigate("/dashboard");
			} else {
				clearTimeout(loadingTimeout);

				toast({
					title: resultAction.payload as string,
					variant: "destructive",
				});
			}
		} catch (error) {
			clearTimeout(loadingTimeout);

			console.log(error);
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				data-testid="register-form"
			>
				{/* Imię i nazwisko w jednym rzędzie */}
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Name <span className="text-destructive">*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Kacper" {...field} />
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
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Adamczyk" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
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

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Email <span className="text-destructive">*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="test@mail.com" type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Password <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input placeholder="secretPass!@" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isLoading}>
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default RegisterForm;
