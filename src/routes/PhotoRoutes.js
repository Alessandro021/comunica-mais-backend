import {Router} from "express";


import {commentPhotoValidation, photoInsertValidation, photoUpdateValidation} from "../middleware/photoValidation.js";
import {authGuard} from "../middleware/authGuard.js";
import {validate} from "../middleware/handleValidation.js";
import {imageUpload} from "../middleware/imageUpload.js";
import { commentPhoto, deletePhoto, getAllPhoto, getPhotoById, getUserPhotos, insertPhoto, likePhoto, searchPhotos, updatePhoto } from "../controllers/Photo/PhotoControler.js";

export const routePhoto = Router();

routePhoto.post("/", authGuard,imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
routePhoto.delete("/:id", authGuard, deletePhoto);
routePhoto.get("/", authGuard, getAllPhoto);
routePhoto.get("/user/:id", authGuard, getUserPhotos);
routePhoto.get("/search", authGuard, searchPhotos);
routePhoto.get("/:id", authGuard, getPhotoById);
routePhoto.put("/:id", authGuard,photoUpdateValidation(), validate, updatePhoto);
routePhoto.put("/like/:id", authGuard, likePhoto);
routePhoto.post("/comment/:id", authGuard, commentPhotoValidation(), validate, commentPhoto);