import {prisma} from "../../database/prisma/index.js";

export const updatePhotoProvider = async (photoId, userId, title) => {
    try {
        const photoExist = await prisma.photo.findFirst({
            where: {id: photoId},

        });

        if(!photoExist){
            return Error("FOTO_NAO_EXISTE");
        }

        if(photoExist.userId !== userId){
            return Error("Erro ao atualizar foto de publicação");
        }
        
        const updatePhoto = await prisma.photo.update({
            where: {id: photoId},
            data: {title: title},
            include: {
                comments: true,
            }
        });

        if(updatePhoto){
            return {updatePhoto, message: "Foto atualizada com sucesso!"};
        } else {
            return Error("Erro ao atualizar foto de publicação");
        }

    } catch (error) {
        // console.log(error);
        return Error("Erro ao atualizar foto de publicação");
    } finally {
        await prisma.$disconnect();
    }
};
