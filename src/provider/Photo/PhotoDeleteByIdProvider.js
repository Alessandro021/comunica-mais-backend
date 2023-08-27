import {prisma} from "../../database/prisma/index.js";

export const deletePhotoProvider = async (photoId, userId) => {
    try {
        const photoExist = await prisma.photo.findFirst({
            where: {id: photoId}
        });

        if(!photoExist){
            return Error("FOTO_NAO_EXISTE");
        }

        if(photoExist.userId !== userId){
            return Error("Erro ao deletar foto de publicação");
        }
        
        const deletePhoto = await prisma.photo.delete({
            where: {id: photoExist.id}
        });

        if(deletePhoto){
            return {id: photoExist.id, message: "Foto excluida com sucesso!"};
        } else {
            return Error("Erro ao deletar foto de publicação");
        }

    } catch (error) {
        console.log(error);
        return Error("Erro ao deletar foto de publicação");
    } finally {
        await prisma.$disconnect();
    }
};
