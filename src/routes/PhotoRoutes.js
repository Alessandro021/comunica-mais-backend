import {Router} from "express";


import {photoInsertValidation} from "../middleware/photoValidation.js";
import {authGuard} from "../middleware/authGuard.js";
import {validate} from "../middleware/handleValidation.js";
import {imageUpload} from "../middleware/imageUpload.js";
import { deletePhoto, getAllPhoto, getPhotoById, getUserPhotos, insertPhoto } from "../controllers/Photo/PhotoControler.js";

export const routePhoto = Router();

routePhoto.post("/", authGuard,imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
routePhoto.delete("/:id", authGuard, deletePhoto);
routePhoto.get("/", authGuard, getAllPhoto);
routePhoto.get("/user/:id", authGuard, getUserPhotos);
routePhoto.get("/:id", authGuard, getPhotoById);