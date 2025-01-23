import type { JobsPayload, SearchQueryOptions, StatsPayload } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
	reducerPath: "jobsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/api/v1",
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
				url: "/jobs",
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
		getStats: builder.query<StatsPayload, void>({
			query: () => "/stats",
			providesTags: ["Stats"],
		}),
	}),
});

export const { useGetJobsQuery, useGetStatsQuery } = jobsApiSlice;
