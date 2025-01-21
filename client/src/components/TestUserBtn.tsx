import { Button } from "./ui/button";

const handleDemoUser = () => {
	console.log("demo user clicked");
};
const TestUserBtn = () => {
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
