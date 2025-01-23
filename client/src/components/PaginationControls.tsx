import type { SearchQueryOptions } from "@/types";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
type PaginationControlsProps = {
	currentPage: number;
	totalPages: number;
	searchParams: SearchQueryOptions;
	setSearchParams: React.Dispatch<React.SetStateAction<SearchQueryOptions>>;
};

const PaginationControls = ({
	currentPage,
	totalPages,
	searchParams,
	setSearchParams,
}: PaginationControlsProps) => {
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
	if (pages.length === 1) return null;
	if (pages.length <= 3) {
		return (
			<Pagination className=" w-[90%] mx-auto py-12">
				<PaginationContent>
					{pages.map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								onClick={() =>
									setSearchParams({
										...searchParams,
										page: page.toString(),
									})
								}
								isActive={page === currentPage}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}
				</PaginationContent>
			</Pagination>
		);
	}
	if (pages.length > 3)
		return (
			<Pagination className=" w-[90%] mx-auto py-12">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								setSearchParams({
									...searchParams,
									page: (currentPage - 1).toString(),
								})
							}
							href="#"
							className={
								currentPage === 1 ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>
					{currentPage !== 1 && (
						<>
							<PaginationItem>
								<PaginationLink
									onClick={() =>
										setSearchParams({
											...searchParams,
											page: pages[0].toString(),
										})
									}
									href="#"
								>
									{pages[0]}
								</PaginationLink>
							</PaginationItem>
							{currentPage !== 2 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
						</>
					)}
					<PaginationItem>
						<PaginationLink
							onClick={() =>
								setSearchParams({
									...searchParams,
									page: currentPage.toString(),
								})
							}
							href="#"
							isActive
						>
							{currentPage}
						</PaginationLink>
					</PaginationItem>
					{currentPage !== pages.length && (
						<>
							{currentPage !== pages.length - 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							<PaginationItem>
								<PaginationLink
									onClick={() =>
										setSearchParams({
											...searchParams,
											page: pages[pages.length - 1].toString(),
										})
									}
									href="#"
								>
									{pages[pages.length - 1]}
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						<PaginationNext
							onClick={() =>
								setSearchParams({
									...searchParams,
									page: (currentPage + 1).toString(),
								})
							}
							href="#"
							className={
								currentPage === totalPages
									? "pointer-events-none opacity-50"
									: ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		);
};
export default PaginationControls;
