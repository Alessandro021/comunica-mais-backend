import {prisma} from "../../database/prisma/index.js";
import { generateHash } from "../../services/bcrypt/index.js";
import { generatedToken } from "../../services/jwt/index.js";

export const registerProvider = async (user) => {
    try {
        const verifyUser = await prisma.user.findFirst({
            where: {email: user.email}
        });

        if(verifyUser){
            return Error("EMAIL_EXISTE");
        }

        const senhaHash = await generateHash(user.password);

        const newUser = await prisma.user.create({
            data: {...user, password: senhaHash},
            select: {
                id: true
            }
        });

        if(!newUser.id){
            return Error("Errro ao cadastrar usuario.");
        }

        const tokenJwt = generatedToken(newUser.id);

        return {_id: newUser.id, token: tokenJwt};

    } catch (error) {
        // console.log(error);
        return Error("Errro ao cadastrar usuario.");
    } finally {
        await prisma.$disconnect();
    }
};

