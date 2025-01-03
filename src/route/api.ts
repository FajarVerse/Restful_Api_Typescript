import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";

// Router Api Khusus untuk User yang sudah login
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);

// Contact Api
apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get);
