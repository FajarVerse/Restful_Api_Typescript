import express from "express";

// Setup Express
export const web = express();
web.use(express.json());
