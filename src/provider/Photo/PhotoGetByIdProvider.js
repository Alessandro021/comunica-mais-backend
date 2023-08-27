import {prisma} from "../../database/prisma/index.js";

export const getPhotoByIdProvider = async (photoId) => {
    try {
        const photo = await prisma.photo.findFirst({
            where: {id: photoId},
            include: {
                likes: true,
                comments: true, 
            }
        });

        if(photo){
            return photo;
        } else {
            return Error("FOTO_NAO_EXISTE");
        }

    } catch (error) {
        console.log(error);
        return Error("Erro ao buscar foto de publicação");
    } finally {
        await prisma.$disconnect();
    }
};
