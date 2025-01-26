import type {
	CreateJobInput,
	JobsPayload,
	SearchQueryOptions,
	StatsPayload,
	UpdateJobInput,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
	reducerPath: "jobsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}` || "http://localhost:8000",
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Jobs", "Stats"],
	endpoints: (builder) => ({
		getJobs: builder.query<JobsPayload, SearchQueryOptions>({
			query: ({ search, status, sort, jobType, page, limit }) => ({
				url: "/api/v1/jobs",
				params: {
					search,
					status,
					sort,
					jobType,
					page,
					limit,
				},
			}),
			providesTags: ["Jobs"],
		}),
		createJob: builder.mutation<void, CreateJobInput>({
			query: (newJob) => ({
				url: "/api/v1/jobs",
				method: "POST",
				body: newJob,
			}),
			invalidatesTags: ["Jobs", "Stats"],
		}),
		updateJob: builder.mutation<
			void,
			{ id: number; job: Partial<UpdateJobInput> }
		>({
			query: ({ id, job }) => ({
				url: `/api/v1/jobs/${id}`,
				method: "PATCH",
				body: job,
			}),
			invalidatesTags: ["Jobs", "Stats"],
		}),
		deleteJob: builder.mutation<void, number>({
			query: (id) => ({
				url: `/api/v1/jobs/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Jobs", "Stats"],
		}),
		getStats: builder.query<StatsPayload, void>({
			query: () => "/api/v1/stats",
			providesTags: ["Stats"],
		}),
	}),
});

export const {
	useGetJobsQuery,
	useGetStatsQuery,
	useCreateJobMutation,
	useDeleteJobMutation,
	useUpdateJobMutation,
} = jobsApiSlice;
