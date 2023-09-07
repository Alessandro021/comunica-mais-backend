import {prisma} from "../../database/prisma/index.js";

export const insertPhotoProvider = async (photo, userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: {id: userId}
        });

        const inserPhoto = await prisma.photo.create({
            data: {...photo, userId: user.id, userName: user.name},
            select: {
                id: true,
                image: true,
                title: true,
                userId: true,
                userName: true,
                comments: true,
                likes: true  
            }
            // data: {title: photo.title, image: photo.image, userId: user.id, userName: user.name, 
            //     comments: {
            //         create: {
            //             comment: ""
            //         }  
            //     },
            //     likes: {
            //         create: {
            //             quantidade: 0
            //         }
            //     }
            // }
        });


        if(inserPhoto){
            return inserPhoto;
        } else {
            return Error("Erro ao adicionar foto");
        }

    } catch (error) {
        // console.log(error);
        return Error("Erro ao adicionar foto");
    } finally {
        await prisma.$disconnect();
    }
};
