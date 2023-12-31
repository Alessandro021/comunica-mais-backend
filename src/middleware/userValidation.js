import { body } from "express-validator";

export const userCreateValidation = () => {
    return [
        body("name").isString().withMessage("O nome é obrigatório.").isLength({min: 3}).withMessage("O nome deve ter no minimo 3 caracteres."),
        body("email").isString().withMessage("O email é obrigatório").isEmail().withMessage("O email deve ser valido."),
        body("password").isString().withMessage("A senha é obrigatória").isLength({min: 6}).withMessage("A senha deve ter no minimo 6 caracteres."),
        body("confirmPassword").isString().withMessage("A confirmação de senha é obrigatória")
            .custom((value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error("As senhas não sao iguais.");
                }
                return true;
            })
    ];
};

export const loginValidation = () => {
    return [
        body("email").isString().withMessage("O email é obrigatório").isEmail().withMessage("O email deve ser valido."),
        body("password").isString().withMessage("A senha é obrigatória").isLength({min: 6}).withMessage("A senha deve ter no minimo 6 caracteres."),
        
    ];
};

// export const userUpdateValidation = () => {
//     return [
//         body("name").optional().isLength({min: 3}).withMessage("O nome deve ter no minimo 3 caracteres."),
//         body("password").optional().isString().withMessage("O senha é obrigatorio").isLength({min: 6}).withMessage("A senha deve ter no minimo 6 caracteres."),
//     ];
// };