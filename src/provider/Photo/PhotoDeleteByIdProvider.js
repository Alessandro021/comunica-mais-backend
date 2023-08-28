import {prisma} from "../../database/prisma/index.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

export const deletePhotoProvider = async (photoId, userId) => {
    try {
        const photoExist = await prisma.photo.findFirst({
            where: {id: photoId}
        });

        if(!photoExist){
            return Error("FOTO_NAO_EXISTE");
        }

        if(photoExist.userId !== userId){
            return Error("USUARIO_NAO_AUTORIZADO");
        }

        await prisma.comments.deleteMany({
            where: {photoId: photoExist.id}
        });
        
        const deletePhoto = await prisma.photo.delete({
            where: {id: photoExist.id}
        });


        if(deletePhoto){
            const photoPath = path.join(__dirname, "/uploads/photos", photoExist.image);
            await fs.promises.unlink(photoPath);
            return {id: photoExist.id, message: "Foto excluida com sucesso!"};
        } else {
            return Error("Erro ao deletar foto de publicação");
        }

    } catch (error) {
        // console.log(error);
        return Error("Erro ao deletar foto de publicação");
    } finally {
        await prisma.$disconnect();
    }
};