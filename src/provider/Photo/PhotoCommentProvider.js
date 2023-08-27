import {prisma} from "../../database/prisma/index.js";

export const commentPhotoProvider = async (photoId, userId, comment) => {
    try {

        const user = await prisma.user.findFirst({
            where: {id: userId}
        });

        const photoExist = await prisma.photo.findFirst({
            where: {id: photoId}
        });

        if(!photoExist){
            return Error("FOTO_NAO_EXISTE");
        }

        const commentPhoto = await prisma.comments.create({
            data: {
                comment: comment,
                userName: user.name,
                userId: user.id,
                userImage: user.profileImage,
                photoId: photoId
            }
        });

        if(commentPhoto){
            return {comment: commentPhoto.comment, message: "O comentario foi adicionado com sucesso!"};
        } else {
            return Error("Erro ao comentar foto de publicação");
        }

    } catch (error) {
        console.log(error);
        return Error("Erro ao comentar foto de publicação");
    } finally {
        await prisma.$disconnect();
    }
};
