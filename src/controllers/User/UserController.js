import { registerProvider } from "../../provider/User/UserProvider.js";

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

