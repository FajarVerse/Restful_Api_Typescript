import express from "express";
import { publicRouter } from "../route/public-api";
import { ErrorMiddleware } from "../middleware/error-middleware";

// Setup Express
export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(ErrorMiddleware);
