import {prisma} from "../../database/prisma/index.js";

export const getAllPhotoProvider = async () => {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: {
                created_at: "desc"
            },
            include: {
                comments: true
            }
        });

        if(photos){
            return photos;
        } else {
            return Error("Erro ao buscar fotos de publicações");
        }
        
    } catch (error) {
        console.log(error);
        return Error("Erro ao buscar fotos de publicações");
    } finally {
        await prisma.$disconnect();
    }
};
