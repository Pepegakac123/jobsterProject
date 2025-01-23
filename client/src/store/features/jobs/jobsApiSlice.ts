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
	tagTypes: ["Jobs"],
	endpoints: (builder) => ({
		getJobs: builder.query<JobsPayload, SearchQueryOptions>({
			query: (params) => ({
				url: "/jobs",
				params: {
					search: params.search,
					status: params.status,
					jobType: params.jobType,
					sort: params.sort,
					page: params.page,
					limit: params.limit,
				},
			}),
			providesTags: ["Jobs"],
		}),
		getStats: builder.query<StatsPayload, void>({
			query: () => "/stats",
		}),
	}),
});

export const { useGetJobsQuery, useGetStatsQuery } = jobsApiSlice;
