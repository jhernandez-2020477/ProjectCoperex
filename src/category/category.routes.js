//Rutas de auntenticación
import { Router } from "express";
import { getAll, saveCategory } from "./category.controller.js";
import { validSaveCate } from "../../helpers/validators.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

//Agregar Categoria
api.post(
    '/save',
    [
        validateJwt,
        isAdmin,
        validSaveCate
    ],
    saveCategory
)

//Obtener todas las categorias
api.get(
    '/',
    getAll
)
//Exportar
export default api
