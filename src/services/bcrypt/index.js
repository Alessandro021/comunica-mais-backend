import bcrypt from "bcryptjs";

const {genSalt, hash} = bcrypt;

const GERARSALT = 10;

export const generateHash = async (senha) => {
    const salt = await genSalt(GERARSALT);
    const passwordHash = await hash(senha, salt);

    return passwordHash;
};