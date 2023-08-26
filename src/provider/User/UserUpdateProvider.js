import {prisma} from "../../database/prisma/index.js";
import { generateHash } from "../../services/bcrypt/index.js";

export const updateUserProvider = async (user, userId) => {
    try {
       
        let newObjectUser = {};
        user.name && (newObjectUser.name = user.name);
        user.password && ( newObjectUser.password = await generateHash(user.password));
        user.bio && (newObjectUser.bio = user.bio);
        user.profileImage && (newObjectUser.profileImage = user.profileImage);


        const updateUser = await prisma.user.update({
            where: {id: userId},
            data: newObjectUser
        });

        if(updateUser){
            return; 
        } else {
            return Error("Errro ao atulizar usuario.");
        }

    } catch (error) {
        console.log(error);
        return Error("Errro ao atulizar usuario.");
    } finally {
        await prisma.$disconnect();
    }
};