import { Router } from "express";


export const route = Router();

route.get("/", (req, res) => {
    res.status(200).json({error: false, message: "Servidor funcionando"});
});