import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<main className="h-screen w-full max-w-7xl mx-auto p-4 flex flex-col ">
			<nav className="w-full flex py-4">
				<Logo />
			</nav>
			<section className="grid place-items-center h-full">
				<div className="flex flex-col lg:flex-row gap-8 items-center flex-1">
					<div className="flex flex-col gap-4 lg:gap-6 px-8 text-center md:text-left items-center lg:items-start">
						<h1 className=" text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold capitalize">
							Job <span className="text-primary">Tracking</span> App
						</h1>
						<p className="text-zinc-400 max-w-lg">
							Effortlessly manage job applications with our tracking app. Stay
							organized, track progress, set reminders, and land your dream job!
						</p>
						<Link to="/register">
							<Button className="w-fit  text-sm lg:text-lg font-medium">
								Login/Register
							</Button>
						</Link>
					</div>
					<img
						src="/personal_goals.svg"
						alt="Illustration of a person analyzing his personal goals"
						className=" w-3/4 md:w-1/3 lg:w-1/2"
					/>
				</div>
			</section>
		</main>
	);
};
export default Landing;
