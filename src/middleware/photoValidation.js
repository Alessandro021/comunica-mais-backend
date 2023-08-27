import { body } from "express-validator";

export const photoInsertValidation = () => {
    return[
        body("title").not().equals("undefined").withMessage("O titulo é obrigatorio.").isString()
            .withMessage("O titulo é obrigatorio").isLength({min: 3}).withMessage("O title precisa ter no minimo 3 caracterers."),
        body("image").custom((value, {req}) => {
            if(!req.file){
                throw new Error("A imagem é obrigatoria.");
            }
            return true;
        })
    ];
};
