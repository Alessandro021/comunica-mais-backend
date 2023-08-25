import {Router} from "express";
import { register, login, getCurrentUser } from "../controllers/User/UserController.js";
import { validate } from "../middleware/handleValidation.js";
import { userCreateValidation, loginValidation } from "../middleware/userValidation.js";
import { authGuard } from "../middleware/authGuard.js";

export const routeUser = Router();

routeUser.post("/register",userCreateValidation(), validate, register);
routeUser.post("/login", loginValidation(), validate, login);
routeUser.get("/profile", authGuard, getCurrentUser);