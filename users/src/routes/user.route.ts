import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";


export const userRouter = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/", userController.getAll.bind(userController));
userRouter.post("/register", userController.register.bind(userController));
userRouter.patch("/:id", userController.update.bind(userController));
userRouter.delete("/:id", userController.delete.bind(userController));
userRouter.post("/login", userController.login.bind(userController));
userRouter.post("/logout", userController.logout.bind(userController));
