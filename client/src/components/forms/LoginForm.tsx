import { loginFormSchema } from "@/schema";
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
import type { AppDispatch, RootState } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading } = useSelector((state: RootState) => state.user);
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
			if (isLoading) {
				const loadingTimeout = setTimeout(() => {
					toast({
						title: "Please be patient",
						description:
							"Due to free hosting, initial connection may take up to 30 seconds while the server is starting up. Your request is being processed...",
					});
				}, 3000);
		
				return () => clearTimeout(loadingTimeout); // Czyścimy timeout, jeśli `isLoading` zmieni się wcześniej
			}
		}, [isLoading]);

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		// const loadingTimeout = setTimeout(() => {
		// 	if (isLoading) {
		// 		toast({
		// 			title: "Please be patient",
		// 			description:
		// 				"Due to free hosting, initial connection may take up to 30 seconds while the server is starting up. Your request is being processed...",
		// 		});
		// 	}
		// }, 3000);
		try {
			const resultAction = await dispatch(loginUser(values));
			if (loginUser.fulfilled.match(resultAction)) {
				// clearTimeout(loadingTimeout);

				toast({
					title: "Logged In Successfully",
				});
				navigate("/dashboard");
			} else {
				// clearTimeout(loadingTimeout);

				form.resetField("password");
				toast({
					title: resultAction.payload as string,
					variant: "destructive",
				});
			}
		} catch (error) {
			// clearTimeout(loadingTimeout);
			form.resetField("password");
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
				data-testid="login-form"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="test@mail.com" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
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
export default LoginForm;
