//Rutas de autenticación
import { Router } from "express";
import { getAll, getAllAZOrZA, getByCategory, getYearOfExperience, saveCompany, updateCompany } from "./company.controller.js";
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

api.get(
    '/getCompanies',
    [
        validateJwt,
        isAdmin
    ],
    getAll
)

api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getYearOfExperience
)

api.get(
    '/cate',
    [
        validateJwt,
        isAdmin
    ],
    getByCategory
)

api.get(
    '/getAscOrDesc',
    [
        validateJwt,
        isAdmin
    ],
    getAllAZOrZA
)

//Exportar 
export default api