import {prisma} from "../../database/prisma/index.js";
import { comparePassword } from "../../services/bcrypt/index.js";
import { generatedToken } from "../../services/jwt/index.js";

export const loginProvider = async (user) => {
    try {
        const verifyUser = await prisma.user.findFirst({
            where: {email: user.email}
        });

        if(!verifyUser){
            return Error("USUARIO_NAO_CADASTRADO");
        }

        const isMatches = await comparePassword(user.password, verifyUser.password);
        if(!isMatches){
            return Error("SENHA_INVALIDA");
        }

        const tokenJwt = generatedToken(verifyUser.id);

        return {_id: verifyUser.id, profileImage: verifyUser.profileImage ,token: tokenJwt};

    } catch (error) {
        console.log(error);
        return Error("Errro ao fazer login.");
    } finally {
        await prisma.$disconnect();
    }
};

