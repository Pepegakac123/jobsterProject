import type { RootState } from "@/store";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const handleDemoUser = () => {
	console.log("demo user clicked");
};
const TestUserBtn = () => {
	const { isLoading } = useSelector((state: RootState) => state.user);
	return (
		<Button
			className="bg-secondary/30 text-secondary-foreground w-full mt-2 base-transition hover:bg-muted"
			onClick={handleDemoUser}
			disabled={isLoading}
		>
			Demo User
		</Button>
	);
};
export default TestUserBtn;
