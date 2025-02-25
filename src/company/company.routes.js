//Rutas de autenticación
import { Router } from "express";
import { saveCompany, updateCompany } from "./company.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { validSaveCompany, validUpdateCompany  } from "../../helpers/validators.js";

const api = Router()

//Agregar Publicación
api.post(
    '/saveCompany',
    [
        validSaveCompany
    ],
    saveCompany
)

//Actualizar Company
api.put(
    '/:id',
    [
        validateJwt,
        isAdmin,
        validUpdateCompany
    ],
    updateCompany
)

//Exportar 
export default api