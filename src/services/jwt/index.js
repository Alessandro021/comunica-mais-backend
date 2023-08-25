import jwt from "jsonwebtoken";

const {sign, decode} = jwt;

export const generatedToken = (id) => {
    return sign({id: id}, process.env.SECRET_JWT, {expiresIn: "7d"});
};
