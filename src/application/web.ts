import express from "express";
import { publicRouter } from "../route/public-api";
import { ErrorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

// Setup Express
export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(ErrorMiddleware);
web.use(apiRouter);
