import { commentPhotoProvider } from "../../provider/Photo/PhotoCommentProvider.js";
import { deletePhotoProvider } from "../../provider/Photo/PhotoDeleteByIdProvider.js";
import { getAllPhotoProvider } from "../../provider/Photo/PhotoGetAllProvider.js";
import { getPhotoByIdProvider } from "../../provider/Photo/PhotoGetByIdProvider.js";
import { getUserPhotosProvider } from "../../provider/Photo/PhotoGetUserProvider.js";
import { likePhotoProvider } from "../../provider/Photo/PhotoLikeProvider.js";
import { insertPhotoProvider } from "../../provider/Photo/PhotoProvider.js";
import { searchPhotosProvider } from "../../provider/Photo/PhotoSearchProvider.js";
import { updatePhotoProvider } from "../../provider/Photo/PhotoUpdateProvider.js";


export const insertPhoto = async (req, res) => {
    const {title} = req.body;
    const image = req.file.filename;

    const userId = req.user.id;

    const result = await insertPhotoProvider({title, image}, userId);

    if(result instanceof Error){
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(201).json({error: false, result: result});
};

export const deletePhoto = async (req, res) => {

    const {id: photoId} = req.params;

    const userId = req.user.id;
    
    const result = await deletePhotoProvider(photoId, userId);

    if(result instanceof Error){
        if(result.message === "FOTO_NAO_EXISTE"){
            return res.status(404).json({error: true, errors: [{error: "Foto não encontrada"}]});
        } else if(result.message === "USUARIO_NAO_AUTORIZADO"){
            return res.status(404).json({error: true, errors: [{error: "Ususario não autorizado para deletar foto."}]});
        }
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};

export const getAllPhoto = async (req, res) => {

    const result = await getAllPhotoProvider();

    if(result instanceof Error){
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};

export const getUserPhotos = async (req, res) => {

    const {id: userId} = req.params;

    const result = await getUserPhotosProvider(userId);

    if(result instanceof Error){
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};

export const getPhotoById = async (req, res) => {

    const {id: photoId} = req.params;
    
    const result = await getPhotoByIdProvider(photoId);

    if(result instanceof Error){
        if(result.message === "FOTO_NAO_EXISTE"){
            return res.status(404).json({error: true, errors: [{error: "Foto não encontrada"}]});
        }
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};


export const updatePhoto = async (req, res) => {

    const {id: photoId} = req.params;
    const {title} = req.body;

    const userId = req.user.id;
    
    const result = await updatePhotoProvider(photoId, userId, title);

    if(result instanceof Error){
        if(result.message === "FOTO_NAO_EXISTE"){
            return res.status(404).json({error: true, errors: [{error: "Foto não encontrada"}]});
        }
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};


export const likePhoto = async (req, res) => {
    const {id: photoId} = req.params;

    const userId = req.user.id;

    const result = await likePhotoProvider(photoId, userId);

    if(result instanceof Error){
        if(result.message === "FOTO_NAO_EXISTE"){
            return res.status(404).json({error: true, errors: [{error: "Foto não encontrada"}]});
        } else if(result.message === "FOTO_JA_CURTIDA"){
            return res.status(422).json({error: true, errors: [{error: "Usuario ja curtiu essa foto"}]});
        }
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};

export const commentPhoto = async (req, res) => {
    const {id: photoId} = req.params;
    const {comment} = req.body;
    const userId = req.user.id;

    const result = await commentPhotoProvider(photoId, userId, comment);
    
    if(result instanceof Error){
        if(result.message === "FOTO_NAO_EXISTE"){
            return res.status(404).json({error: true, errors: [{error: "Foto não encontrada"}]});
        }
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};

export const searchPhotos = async (req, res) => {
    const {q} = req.query;

    const result = await searchPhotosProvider(q);
    
    if(result instanceof Error){
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};