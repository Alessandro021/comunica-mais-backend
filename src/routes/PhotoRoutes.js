import {Router} from "express";


import {photoInsertValidation} from "../middleware/photoValidation.js";
import {authGuard} from "../middleware/authGuard.js";
import {validate} from "../middleware/handleValidation.js";
import {imageUpload} from "../middleware/imageUpload.js";
import { insertPhoto } from "../controllers/Photo/PhotoControler.js";

export const routePhoto = Router();

routePhoto.post("/", authGuard,imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
