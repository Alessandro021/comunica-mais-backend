import { deletePhotoProvider } from "../../provider/Photo/PhotoDeleteByIdProvider.js";
import { insertPhotoProvider } from "../../provider/Photo/PhotoProvider.js";


export const insertPhoto = async (req, res) => {
    const {title} = req.body;
    const image = req.file.filename;

    const userId = req.user.id;

    const result = await insertPhotoProvider({title, image}, userId);

    if(result instanceof Error){
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(201).json({error: false, result: result});
};

export const deletePhoto = async (req, res) => {

    const {id: photoId} = req.params;

    const userId = req.user.id;
    
    const result = await deletePhotoProvider(photoId, userId);

    if(result instanceof Error){
        if(result.message === "FOTO_NAO_EXISTE"){
            return res.status(422).json({error: true, message: "Foto não encontrada"});
        }
        return res.status(500).json({error: true, message: result.message});
    }

    return res.status(201).json({error: false, result: result});
};