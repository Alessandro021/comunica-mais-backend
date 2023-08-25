import {Router} from "express";
import { register } from "../controllers/User/UserController.js";
import { validate } from "../middleware/handleValidation.js";
import { userCreateValidation } from "../middleware/userValidation.js";

export const routeUser = Router();

routeUser.post("/register",userCreateValidation(), validate, register);
