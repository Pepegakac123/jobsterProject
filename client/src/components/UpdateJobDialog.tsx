import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { UpdateJobInput } from "@/types";
import { UpdateJobForm } from "./forms";

const UpdateJobDialog = ({ job }: { job: UpdateJobInput }) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="w-fit text-sm font-bold shadow-md shadow-primary/40 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/60 base-transition">
				Edit
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Job Entry</DialogTitle>
					<DialogDescription>
						Make changes to your jobs application here. Click save when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<UpdateJobForm job={job} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
};

export default UpdateJobDialog;
