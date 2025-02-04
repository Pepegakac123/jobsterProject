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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import Loading from "../Loading";
import {
	updateProfileImage,
	updateUser,
} from "@/store/features/user/userSlice";
import { useState } from "react";

const UpdateProfileForm = () => {
	const { toast } = useToast();
	const dispatch = useDispatch<AppDispatch>();
	const { user, isLoading } = useSelector((state: RootState) => state.user);
	const [preview, setPreview] = useState<string | null>(null);
	const form = useForm<z.infer<typeof updateProfileFormSchema>>({
		resolver: zodResolver(updateProfileFormSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
			lastName: user?.lastName,
			location: user?.location,
			profileImage: "",
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

			const fileInput = form.getValues("profileImage");
			if (fileInput instanceof File) {
				const formData = new FormData();
				formData.append("image", fileInput);

				const uploadResult = await dispatch(updateProfileImage(formData));
				if (updateProfileImage.fulfilled.match(uploadResult)) {
					const updateResult = await dispatch(
						updateUser({
							...values,
							profileImage: uploadResult.payload.image.src,
						}),
					);

					if (updateUser.fulfilled.match(updateResult)) {
						toast({
							title: "Profile updated successfully",
						});
						return;
					}
				}
			} else {
				// Aktualizuj profil bez zdjęcia
				const resultAction = await dispatch(updateUser(values));
				if (updateUser.fulfilled.match(resultAction)) {
					toast({
						title: "Profile updated successfully",
					});
					return;
				}
			}
		} catch (error) {
			if (error && typeof error === "object" && "payload" in error) {
				toast({
					title: error.payload as string,
					variant: "destructive",
				});
			} else {
				toast({
					title: "An unexpected error occurred",
					variant: "destructive",
				});
			}
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
			// Przekaż bezpośrednio plik
			form.setValue("profileImage", file);
		}
	};

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
					name="profileImage"
					render={({ field: { value, onChange, ...field } }) => (
						<FormItem className="flex flex-col items-center gap-4">
							<FormLabel>Profile Image</FormLabel>
							<div className="w-full flex gap-4 items-center">
								<img
									src={
										preview ||
										`${user?.profileImage}` ||
										"../../assets/images/defaultAvatar.png"
									}
									alt="Profile"
									className="w-8 h-8 object-cover rounded-full"
								/>

								<FormControl>
									<Input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										{...field}
									/>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
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
