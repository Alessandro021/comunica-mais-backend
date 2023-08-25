import { registerProvider } from "../../provider/User/UserRegisterProvider.js";
import { loginProvider } from "../../provider/User/UserLoginProvider.js";

export const register = async (req, res) => {
    const {name, password, email} = req.body;
    const result = await registerProvider({name, password, email});
    if(result instanceof Error) {
        if(result.message === "EMAIL_EXISTE"){
            return res.status(422).json({error: true, message: "Email já cadastrado."});
        } else {
            return res.status(422).json({error: true, message: result.message});
        }
    }

    return res.status(201).json({error: false, result: result});
};

export const login = async (req, res) => {
    const  {email, password} = req.body;
    const result = await loginProvider({password, email});
    if(result instanceof Error) {
        if(result.message === "USUARIO_NAO_CADASTRADO"){
            return res.status(404).json({error: true, message: "Usuario não encontrado"});
        } else if(result.message === "SENHA_INVALIDA"){
            return res.status(422).json({error: true, message: "Senha invalida"});
        }else {
            return res.status(422).json({error: true, message: result.message});
        }
    }

    return res.status(200).json({error: false, result: result});
};

