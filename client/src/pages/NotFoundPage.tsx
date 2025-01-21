import { Link } from "react-router-dom";
import notFound from "../assets/images/notFound.svg";

const NotFoundPage = () => {
	return (
		<section className="h-screen w-full grid place-items-center">
			<div className="flex flex-col gap-8 items-center px-4 text-center">
				<img src={notFound} alt="Error 404 page not found" className="w-3/4" />
				<div className="flex flex-col gap-4 items-center">
					<h2 className=" text-2xl md:text-3xl capitalize ">
						Ohh! Page Not Found
					</h2>
					<p className="text-zinc-400 text-sm md:text-md">
						We can't seem to find the page you looking for
					</p>
					<Link to="/" className="underline text-primary">
						Go Back Home
					</Link>
				</div>
			</div>
		</section>
	);
};
export default NotFoundPage;
