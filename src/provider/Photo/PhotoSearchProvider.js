import {prisma} from "../../database/prisma/index.js";

export const searchPhotosProvider = async (filter) => {
    try {
        const photos = await prisma.photo.findMany({
            where: {
                title: {
                    contains: filter,
                    mode: "insensitive"
                }
            },
            include: {
                comments: true
            }
        });

        if(photos){
            return photos;
        } else {
            return Error("Erro ao buscar foto");
        }

    } catch (error) {
        // console.log(error);
        return Error("Erro ao buscar foto");
    } finally {
        await prisma.$disconnect();
    }
};
