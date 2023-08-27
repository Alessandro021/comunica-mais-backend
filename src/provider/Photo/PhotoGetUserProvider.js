import {prisma} from "../../database/prisma/index.js";

export const getUserPhotosProvider = async (userId) => {
    try {
        
        const Photos = await prisma.photo.findMany({
            where: {userId: userId},
            orderBy: {
                created_at: "desc"
            },
            include: {
                likes: true,
                comments: true,
            }
        });

        if(Photos){
            return Photos;
        } else {
            return Error("Erro ao buscar fotos de usuario");
        }

    } catch (error) {
        console.log(error);
        return Error("Erro ao buscar fotos de usuario");
    } finally {
        await prisma.$disconnect();
    }
};