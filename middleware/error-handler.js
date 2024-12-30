import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export default function errorHandlerMiddleware(err, req, res, next) {
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
}
