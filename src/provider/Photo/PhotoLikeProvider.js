import {prisma} from "../../database/prisma/index.js";

export const likePhotoProvider = async (photoId, userId) => {
    try {
        const photoExist = await prisma.photo.findFirst({
            where: {id: photoId}
        });

        if(!photoExist){
            return Error("FOTO_NAO_EXISTE");
        }

        if(photoExist.likes.includes(userId)){
            return Error("FOTO_JA_CURTIDA");
        }
        photoExist.likes.push(userId);
        const LikePhoto = await prisma.photo.update({
            where: {id: photoExist.id},
            data: {likes: photoExist.likes}
        });

        if(LikePhoto){
            return {userId: userId, photoId: photoId, message: "Foto curtida com sucesso!"};
        } else {
            return Error("Erro ao curtir foto de publicação");
        }

    } catch (error) {
        // console.log(error);
        return Error("Erro ao curtir foto de publicação");
    } finally {
        await prisma.$disconnect();
    }
};
