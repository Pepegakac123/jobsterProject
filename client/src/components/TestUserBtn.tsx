import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { loginDemoUser } from "@/store/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/store";

const TestUserBtn = () => {
	const { toast } = useToast();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleDemoUser = async () => {
		try {
			const resultAction = await dispatch(loginDemoUser());

			if (loginDemoUser.fulfilled.match(resultAction)) {
				toast({
					title: "Logged in as Demo User",
					description: "You have limited permissions in this mode",
				});
				navigate("/dashboard");
			} else {
				toast({
					title: "Login failed",
					description: resultAction.payload as string,
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Wystąpił nieoczekiwany błąd",
				variant: "destructive",
			});
		}
	};

	return (
		<Button
			className="bg-secondary/30 text-secondary-foreground w-full mt-2 base-transition hover:bg-muted"
			onClick={handleDemoUser}
		>
			Demo User
		</Button>
	);
};

export default TestUserBtn;
