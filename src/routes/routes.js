import { Router } from "express";
import { routeUser } from "./UserRoutes.js";


export const route = Router();

route.use("/api/users", routeUser);

route.get("/", (req, res) => {
    res.status(200).json({error: false, message: "Servidor funcionando"});
});