import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { LoginForm, RegisterForm } from "@/components/forms";
import TestUserBtn from "@/components/TestUserBtn";
const Register = () => {
	const [showLoginForm, setShowLoginForm] = useState(true);

	return (
		<main className="grid w-full h-screen place-items-center bg-muted/50">
			<Card className="w-[90%] max-w-md shadow-animate-primary">
				<CardHeader className="gap-4 text-center">
					<Logo className="mx-auto" />
					<CardTitle>{showLoginForm ? "Login" : "Register"}</CardTitle>
				</CardHeader>
				<CardContent>
					{showLoginForm ? <LoginForm /> : <RegisterForm />}
					<TestUserBtn />
				</CardContent>
				<CardFooter className="flex justify-center gap-2">
					{showLoginForm ? (
						<>
							Not a member yet?{" "}
							<button
								type="button"
								className="text-primary hover:underline"
								onClick={() => setShowLoginForm(false)}
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
								onClick={() => setShowLoginForm(true)}
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
