import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
	return (
		<Card className="w-[90%] mx-auto mt-8 max-w-4xl shadow-animate-primary">
			<CardHeader>
				<CardTitle>Update Your Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<UpdateProfileForm />
			</CardContent>
		</Card>
	);
};
export default Profile;
