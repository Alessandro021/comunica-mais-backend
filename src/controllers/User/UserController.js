import { registerProvider } from "../../provider/User/UserRegisterProvider.js";
import { loginProvider } from "../../provider/User/UserLoginProvider.js";
import { updateUserProvider } from "../../provider/User/UserUpdateProvider.js";
import { getUserByIdProvider } from "../../provider/User/UserGetByIdProvider.js";

export const register = async (req, res) => {
    const {name, password, email} = req.body;
    const result = await registerProvider({name, password, email});
    if(result instanceof Error) {
        if(result.message === "EMAIL_EXISTE"){
            return res.status(422).json({error: true, errors: [{error: "Email já cadastrado."}]});
        } else {
            return res.status(500).json({error: true, errors: [{error: result.message}]});
        }
    }

    return res.status(201).json({error: false, result: result});
};

export const login = async (req, res) => {
    const  {email, password} = req.body;
    const result = await loginProvider({password, email});
    if(result instanceof Error) {
        if(result.message === "USUARIO_NAO_CADASTRADO"){
            return res.status(404).json({error: true, errors: [{error: "Usuario não encontrado"}]});
        } else if(result.message === "SENHA_INVALIDA"){
            return res.status(422).json({error: true, errors: [{error: "Senha invalida"}]});
        }else {
            return res.status(500).json({error: true, errors: [{error: result.message}]});
        }
    }

    return res.status(200).json({error: false, result: result});
};


export const getCurrentUser = async (req, res) => {
    const  user = req.user;

    return res.status(200).json({error: false, result: user});
};

export const updateUser = async (req, res) => {

    let errors = [];

    const  {name, password, bio} = req.body;

    if(name) {
        if(name.length < 3) {
            errors.push({name: "O nome deve ter no minimo 3 caracteres."});
        }
    }

    if(password){
        if(password.length < 6) {
            errors.push({password: "A senha deve ter no minimo 6 caracteres."});
        }
    }

    if(errors.length > 0){
        return res.status(422).json({error: true, errors: errors});
    }
        
    let profileImage = null;

    if(req.file){
        profileImage = req.file.filename;
    }

    const userId = req.user.id;

    const result = await updateUserProvider({name, password, bio, profileImage}, userId);
    if(result instanceof Error) {
        return res.status(500).json({error: true, errors: [{error: result.message}]});
    }

    return res.status(200).json({error: false, result: result});
};

export const getUserById = async (req, res) => {

    const {id} = req.params;

    const result = await getUserByIdProvider(id);
    if(result instanceof Error) {
        if(result.message === "USER_NAO_ENCONTRADO"){
            return res.status(422).json({error: true, errors: [{ error: "Usuario não foi encontrado!"}]});
        } else {
            return res.status(500).json({error: true, errors: [{error: result.message}]});
        }
    }

    return res.status(200).json({error: false, result: result});
};


