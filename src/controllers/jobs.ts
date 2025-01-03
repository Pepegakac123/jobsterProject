// @desc Get All Jobs
// @route GET /api/v1/jobs

import type { Request, Response } from "express";

export const getAllJobs = (req: Request, res: Response) => {
	res.send("get all jobs");
};

// @desc Get Single Job
// @route GET /api/v1/jobs/:id
export const getSingleJob = (req: Request, res: Response) => {
	res.send("get single job");
};

// @desc Create Job
// @route POST /api/v1/jobs
export const createJob = (req: Request, res: Response) => {
	res.send("create job");
};

// @desc Update Job
// @route PATCH /api/v1/jobs/:id
export const updateJob = (req: Request, res: Response) => {
	res.send("update job");
};

// @desc Delete Job
// @route DELETE /api/v1/jobs/:id
export const deleteJob = (req: Request, res: Response) => {
	res.send("delete job");
};
