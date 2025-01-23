import Logo from "./Logo";
import { RiMenu4Line } from "react-icons/ri";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { store, type AppDispatch } from "@/store";
import { logout } from "@/store/features/user/userSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
import { mobileNavLinks } from "@/utils";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { jobsApiSlice } from "@/store/features/jobs/jobsApiSlice";
export const loader = async () => {
	const token = localStorage.getItem("token");

	if (!token) return redirect("/register");

	// try {
	// 	await store.dispatch(jobsApiSlice.endpoints.getStats.initiate({}));

	// 	const result = jobsApiSlice.endpoints.getStats.select({})(store.getState());

	// 	return result.data;
	// } catch (error) {
	// 	throw new Error(`Failed to fetch stats: ${error}`);
	// }
};

const DashboardLayout = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isLaptop = useMediaQuery({ minWidth: 1024 });
	const [toggleSidebar, setToggleSidebar] = useState(true);

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/register");
	};

	return (
		// <main
		// 	className={`grid grid-cols-1 transition-[grid-template-columns] duration-300 ease-in-out ${
		// 		toggleSidebar ? "lg:grid-cols-[auto_1fr]" : "lg:grid-cols-[0_1fr]"
		// 	}`}
		// >
		<main className="flex w-full">
			<aside
				className={`${
					toggleSidebar ? "w-64" : "w-0"
				} hidden lg:flex flex-col items-center h-screen sticky top-0 bg-card overflow-hidden base-transition`}
			>
				<div className="sticky top-0 flex flex-col items-center w-full h-full ">
					<div className="max-h-20 h-full w-full flex items-center justify-center">
						<Logo />
					</div>
					<div className="h-full border-r border-primary w-full">
						<nav className="flex flex-col gap-3 w-full mt-12">
							{mobileNavLinks.map(({ text, path, icon: Icon }) => (
								<NavLink
									key={path}
									to={path}
									end
									className={({ isActive }) =>
										`group flex flex-row items-center justify-center text-xl font-thin capitalize text-zinc-400 base-transition hover:text-primary
         w-full p-2 ${isActive ? "!text-primary [&_*]:text-primary" : ""}`
									}
								>
									<div className="flex items-center w-32">
										<Icon className="group-hover:text-primary min-w-8" />
										<span className="ml-3">{text}</span>
									</div>
								</NavLink>
							))}
						</nav>
					</div>
				</div>
			</aside>
			<section className="flex-1 transition-all duration-300">
				<nav className="h-20 flex flex-col items-center justify-center bg-card p-4 border-b border-primary">
					<div className="flex justify-between items-center w-[90%] h-full">
						{isLaptop ? (
							<Button
								onClick={() => setToggleSidebar(!toggleSidebar)}
								className="base-tra
                         hover:bg-muted p-2 rounded-md bg-transparent"
							>
								<RiMenu4Line className="!w-8 !h-8 text-primary" />
							</Button>
						) : (
							<Dialog>
								<DialogTrigger
									className="base-tra
                         hover:bg-muted p-2 rounded-md"
								>
									<RiMenu4Line className="!w-8 !h-8 text-primary" />
								</DialogTrigger>
								<DialogContent className="w-[90%] h-[90%] flex flex-col gap-8 items-center py-16 ">
									<Logo className="w-48" />
									<nav className="flex flex-col gap-3 w-full">
										{mobileNavLinks.map(({ text, path, icon: Icon }) => (
											<NavLink
												key={path}
												to={path}
												end
												className={({ isActive }) =>
													`group flex flex-row items-center justify-center text-xl font-thin capitalize text-zinc-400 base-transition hover:text-primary
         w-full p-2 ${isActive ? "!text-primary [&_*]:text-primary" : ""}`
												}
											>
												<div className="flex items-center w-32">
													<Icon className="group-hover:text-primary min-w-8" />
													<span className="ml-3">{text}</span>
												</div>
											</NavLink>
										))}
									</nav>
								</DialogContent>
							</Dialog>
						)}
						{isLaptop ? (
							<h1 className="text-xl font-bold">Dashboard</h1>
						) : (
							<Logo className="w-42" />
						)}

						<Button
							className="bg-primary uppercase p-2 font-bold h-8 text-xs"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				</nav>
				<section className="bg-background w-full">
					<Outlet />
				</section>
			</section>
		</main>
	);
};
export default DashboardLayout;
