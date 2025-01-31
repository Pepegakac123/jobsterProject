import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

const UserAvatar = () => {
	const { user } = useSelector((state: RootState) => state.user);
	return (
		<Avatar className="w-8 h-8 rounded-full">
			<AvatarImage src={`${user?.profileImage}`} />
			<AvatarFallback>{`${user?.name[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`}</AvatarFallback>
		</Avatar>
	);
};
export default UserAvatar;
