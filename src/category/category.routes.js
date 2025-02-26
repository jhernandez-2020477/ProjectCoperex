//Rutas de auntenticación
import { Router } from "express";
import { deleteCategory, getAll, saveCategory, updateCategory } from "./category.controller.js";
import { validSaveCate, validUpdateCate } from "../../helpers/validators.js";
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

//Editar las categorias
api.put(
    '/:id',
    [
        validateJwt,
        isAdmin,
        validUpdateCate
    ],
    updateCategory
)

//Eliminar Categoria
api.delete(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteCategory
)
//Exportar
export default api
