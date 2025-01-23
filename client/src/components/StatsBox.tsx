import { cn } from "@/lib/utils";
interface StatsBoxProps {
	number: string;
	title: string;
	color: "pending" | "declined" | "interview";
	icon: React.ReactNode;
}
const colorConfig = {
	pending: {
		text: "text-pending",
		background: "bg-pending/20",
	},
	declined: {
		text: "text-declined",
		background: "bg-declined/20",
	},
	interview: {
		text: "text-interview",
		background: "bg-interview/20",
	},
} as const;

const StatsBox = ({ number, title, color, icon: Icon }: StatsBoxProps) => {
	return (
		<section className="flex flex-col items-center w-full gap-4 justify-start pt-6 pb-2">
			<div className="flex flex-row items-center justify-between w-full">
				<span
					className={cn("w-full text-4xl font-bold", colorConfig[color].text)}
				>
					{number}
				</span>
				<span
					className={cn(
						"p-4 rounded-sm",
						colorConfig[color].background,
						colorConfig[color].text,
					)}
				>
					{Icon}
				</span>
			</div>
			<p className="text-lg text-zinc-400 w-full">{title}</p>
		</section>
	);
};

export default StatsBox;
