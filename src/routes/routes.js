import { Router } from "express";
import { routeUser } from "./UserRoutes.js";
import {routePhoto} from "./PhotoRoutes.js";


export const route = Router();

route.use("/api/users", routeUser);
route.use("/api/photos", routePhoto);

route.get("/", (req, res) => {
    res.status(200).json({error: false, message: "Servidor funcionando"});
});