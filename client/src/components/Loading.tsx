import { Spinner } from "@/components/ui/spinner";

const Loading = ({ text }: { text?: string }) => {
	return (
		<div className="grid mt-6 w-full h-full place-items-center">
			<Spinner size="large">{text ?? "Loading..."}</Spinner>
		</div>
	);
};
export default Loading;
