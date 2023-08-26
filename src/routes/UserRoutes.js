import {Router} from "express";
import { register, login, getCurrentUser, updateUser } from "../controllers/User/UserController.js";
import { validate } from "../middleware/handleValidation.js";
import { userCreateValidation, loginValidation, userUpdateValidation } from "../middleware/userValidation.js";
import { authGuard } from "../middleware/authGuard.js";
import { imageUpload } from "../middleware/imageUpload.js";

export const routeUser = Router();

routeUser.post("/register",userCreateValidation(), validate, register);
routeUser.post("/login", loginValidation(), validate, login);
routeUser.get("/profile", authGuard, getCurrentUser);
routeUser.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), updateUser);