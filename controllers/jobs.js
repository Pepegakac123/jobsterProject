// @desc Get All Jobs
// @route GET /api/v1/jobs

export const getAllJobs = (req, res) => {
	res.send("get all jobs");
};

// @desc Get Single Job
// @route GET /api/v1/jobs/:id
export const getSingleJob = (req, res) => {
	res.send("get single job");
};

// @desc Create Job
// @route POST /api/v1/jobs
export const createJob = (req, res) => {
	res.send("create job");
};

// @desc Update Job
// @route PATCH /api/v1/jobs/:id
export const updateJob = (req, res) => {
	res.send("update job");
};

// @desc Delete Job
// @route DELETE /api/v1/jobs/:id
export const deleteJob = (req, res) => {
	res.send("delete job");
};
