import { Router } from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/user.controller";
import { asyncHandler } from "../utils/async-handler.util";
import HttpStatusCode from "../utils/status-codes.util";

const router = Router();
const userController = Container.get(UserController);

router.get(
  "/users",
  asyncHandler(async (_, res) => {
    const users = await userController.getAllUsers();
    res.json(users);
  })
);

router.post(
  "/users",
  asyncHandler(async (req, res) => {
    const user = await userController.createUser(req.body);
    res.status(HttpStatusCode.CREATED).json(user);
  })
);

export default router;
