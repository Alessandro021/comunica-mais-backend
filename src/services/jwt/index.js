import jwt from "jsonwebtoken";

const {sign, verify} = jwt;

export const generatedToken = (id) => {
    return sign({id: id}, process.env.SECRET_JWT, {expiresIn: "7d"});
};

export const decodeToken = (token) => {
    return verify(token, process.env.SECRET_JWT);
};
