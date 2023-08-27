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