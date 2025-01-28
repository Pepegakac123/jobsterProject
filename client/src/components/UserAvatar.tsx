import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

const UserAvatar = () => {
	const baseApiUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
	const { user } = useSelector((state: RootState) => state.user);
	return (
		<Avatar className="w-8 h-8 rounded-full">
			<AvatarImage src={`${baseApiUrl}${user?.profileImage}`} />
			<AvatarFallback>{`${user?.name[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`}</AvatarFallback>
		</Avatar>
	);
};
export default UserAvatar;
