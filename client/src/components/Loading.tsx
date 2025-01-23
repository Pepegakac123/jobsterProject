import React from "react";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
	return (
		<div className="grid mt-6 w-full h-full place-items-center">
			<Spinner size="large">Loading...</Spinner>
		</div>
	);
};
export default Loading;
