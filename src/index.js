import "dotenv/config";
import express, { json, urlencoded } from "express";
import path from "path";
import cors from "cors";
import { route } from "./routes/routes.js";

const app = express();


app.use(json());
app.use(urlencoded({extended: false}));//ACEITAR FORMDATA
app.use(cors({
    origin: "*"  
}));
app.use("/uploads", express.static(path.join("uploads")));
app.use(route);

app.listen(process.env.PORT || 3333, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT||3333}`);
});