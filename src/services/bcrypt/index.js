import bcrypt from "bcryptjs";

const {genSalt, hash, compare} = bcrypt;

const GERARSALT = 10;

export const generateHash = async (senha) => {
    const salt = await genSalt(GERARSALT);
    const passwordHash = await hash(senha, salt);

    return passwordHash;
};

export const comparePassword = async (senha, hash) => {
    const isMatches = await compare(senha, hash);

    return isMatches;
};