import type { JobsPayload, SearchQueryOptions } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
	reducerPath: "jobsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/api/v1",
	}),
	endpoints: (builder) => ({
		getJobs: builder.query<JobsPayload, SearchQueryOptions>({
			query: ({ search, status, sort, jobType, page, limit }) => "/jobs",
		}),
		getStats: builder.query({
			query: () => "/stats",
		}),
	}),
});

export const { useGetJobsQuery, useGetStatsQuery } = jobsApiSlice;
