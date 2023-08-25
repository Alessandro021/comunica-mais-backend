import { prisma } from "../database/prisma/index.js";
import { decodeToken } from "../services/jwt/index.js";


export const authGuard = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({error: true, message: "Acesso negado!"});
        }

        const verified = decodeToken(token);

        if(!verified){
            return res.status(401).json({error: true, message: "Token invalido!"});
        }

        req.user = await prisma.user.findFirst({
            where: {id: verified.id},
            select: {
                // password: false,
                id: true,
                name: true,
                email: true,
                bio: true,
                profileImage: true,
                created_at: true,
                updated_at: true,
            }
        });

        next();


    } catch (error) {
        console.log(error);
        return res.status(500).json({error: true, message: "Erro, acesso negado!"});
    } finally {
        await prisma.$disconnect();
    }
};