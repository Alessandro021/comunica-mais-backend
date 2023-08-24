import "dotenv/config";
import express, { json, urlencoded } from "express";
import path from "path";
import cors from "cors";

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));//ACEITAR FORMDATA
app.use(cors({
    origin: "*"  
}));

app.listen(process.env.PORT || 3333, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT||3333}`);
});