import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { LoginForm, RegisterForm } from "@/components/forms";
import TestUserBtn from "@/components/TestUserBtn";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useToast } from "@/hooks/use-toast";
const Register = () => {
	const [isMember, setIsMember] = useState<boolean>(true);
	const { isLoading } = useSelector((state: RootState) => state.user);
	const { toast } = useToast();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isLoading) {
			toast({
				title: "Logging In...",
			});
		}
	}, [isLoading]);
	return (
		<main className="grid w-full h-screen place-items-center bg-muted/50">
			<Card className="w-[90%] max-w-md shadow-animate-primary">
				<CardHeader className="gap-4 text-center">
					<Logo className="mx-auto" />
					<CardTitle>{isMember ? "Login" : "Register"}</CardTitle>
				</CardHeader>
				<CardContent>
					{isMember ? <LoginForm /> : <RegisterForm />}
					<TestUserBtn />
				</CardContent>
				<CardFooter className="flex justify-center gap-2">
					{isMember ? (
						<>
							Not a member yet?{" "}
							<button
								type="button"
								disabled={isLoading}
								className="text-primary hover:underline"
								onClick={() => setIsMember(false)}
							>
								Register
							</button>
						</>
					) : (
						<>
							Already a member?{" "}
							<button
								type="button"
								className="text-primary hover:underline"
								disabled={isLoading}
								onClick={() => setIsMember(true)}
							>
								Login
							</button>
						</>
					)}
				</CardFooter>
			</Card>
		</main>
	);
};
export default Register;
