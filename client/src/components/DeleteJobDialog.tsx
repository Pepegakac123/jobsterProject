import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteJobMutation } from "@/store/features/jobs/jobsApiSlice";
import { useToast } from "@/hooks/use-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Loading from "./Loading";

const DeleteJobDialog = ({ id }: { id: number }) => {
	const { toast } = useToast();
	const [deleteJob, { isLoading }] = useDeleteJobMutation();

	const handleDelete = async (id: number) => {
		try {
			await deleteJob(id).unwrap();
			toast({
				title: "Job deleted successfully",
			});
		} catch (error) {
			const err = error as FetchBaseQueryError;
			toast({
				title:
					"data" in err
						? (err.data as { msg: string }).msg
						: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger className="w-fit text-sm font-bold bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-md shadow-destructive/40 px-4 py-2 rounded-md">
				Delete
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{isLoading ? (
					<Loading />
				) : (
					<AlertDialogFooter>
						<AlertDialogCancel
							className={isLoading ? "pointer-events-none" : ""}
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
							onClick={() => handleDelete(id)}
							disabled={isLoading}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				)}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteJobDialog;
