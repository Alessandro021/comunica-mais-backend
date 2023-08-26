import multer from "multer";
import path from "path";
import {randomUUID } from "crypto";

// const __dirname = path.resolve();
const imageaStore = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users";
        } else if(req.baseUrl.includes("photos")){
            folder = "photos";
        }

        callback(null, `uploads/${folder}` );
    },
    filename: (req, file, callback) => {
        callback(null, randomUUID() + path.extname(file.originalname));
    }
});

export const imageUpload = multer({
    storage: imageaStore,
    fileFilter: (req, file, callback) => {
        try {
            if(!file.originalname.match(/\.(jpg|jpeg)$/)){
                return callback(new Error("Atenção a extenção da imagem deve ser png ou jpg"));
            }
            callback(null, true);
        } catch (error) {
            callback(error, false);
            return callback(new Error("Houve um erro ao tentar enviar o arquivo."));
        }
    }
});
