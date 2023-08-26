import {prisma} from "../../database/prisma/index.js";

export const getUserByIdProvider = async (userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: {id: userId},
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                profileImage: true,
                created_at: true,
                updated_at: true
            }
        });

        if(user){
            return user; 
        } else {
            return Error("USER_NAO_ENCONTRADO");
        }

    } catch (error) {
        console.log(error);
        return Error("Errro ao buscar usuario.");
    } finally {
        await prisma.$disconnect();
    }
};