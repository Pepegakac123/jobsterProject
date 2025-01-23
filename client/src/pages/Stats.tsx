import StatsBox from "@/components/StatsBox";
import { Card, CardContent } from "@/components/ui/card";
import {
	RiTimeLine, // Pending
	RiCloseLine, // Declined
	RiCheckLine, // Accepted
	RiTeamLine, // Interview
} from "react-icons/ri";
const Stats = () => {
	return (
		<section className="mx-auto w-[90%] mt-8 max-w-4xl  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<Card className="w-full border-0 border-b-2 border-pending p-0">
				<CardContent>
					<StatsBox
						number="12"
						title="Pending Applications"
						color="pending"
						icon={<RiTimeLine />}
					/>
				</CardContent>
			</Card>
			<Card className="w-full border-0 border-b-2 border-declined p-0">
				<CardContent>
					<StatsBox
						number="24"
						title="Declined"
						color="declined"
						icon={<RiCloseLine />}
					/>
				</CardContent>
			</Card>

			<Card className="w-full border-0 border-b-2 border-interview p-0 .shadow-animate-interview">
				<CardContent>
					<StatsBox
						number="8"
						title="Interview"
						color="interview"
						icon={<RiTeamLine />}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
export default Stats;
