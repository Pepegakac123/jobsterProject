import Logo from "./Logo";
import { Toggle } from "@/components/ui/toggle";
import { RiMenu4Line } from "react-icons/ri";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { logout } from "@/store/features/user/userSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NavLink } from "react-router-dom";
import {
	RiAddCircleLine, // dla "Add Job"
	RiBriefcaseLine, // dla "All Jobs"
	RiBarChartLine, // dla "Stats"
	RiUserLine, // dla "Profile"
} from "react-icons/ri";
import { mobileNavLinks } from "@/utils";

const DashboardLayout = () => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<main className="grid grid-cols-1">
			<nav className="h-20 flex flex-col items-center justify-center bg-card p-4">
				<div className="flex justify-between items-center w-[90%] h-full">
					<Dialog>
						<DialogTrigger>
							<Toggle className="" aria-label="Toggle italic">
								<RiMenu4Line className="!w-8 !h-8 text-primary" />
							</Toggle>
						</DialogTrigger>
						<DialogContent className="w-[90%] h-[90%] flex flex-col gap-8 items-center py-16 ">
							<Logo className="w-48" />
							<nav className="flex flex-col gap-3 w-full">
								{mobileNavLinks.map(({ text, path, icon: Icon }) => (
									<NavLink
										key={path}
										to={path}
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

					<Logo className=" w-24" />
					<Button
						className="bg-primary uppercase p-2 font-bold h-8 text-xs"
						onClick={() => dispatch(logout())}
					>
						Logout
					</Button>
				</div>
			</nav>
		</main>
	);
};
export default DashboardLayout;
