//Rutas de autenticación
import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { validUpdatePassword, validUpdateUser } from "../../helpers/validators.js";
import { deleteUser, updatePassword, updateUser } from "./user.controller.js";

const api = Router()
//Rutas privadas

//Actualizar Usuario
api.put(
    '/:id',
    [
        validateJwt,
        validUpdateUser
    ],
    updateUser
)

//Actualizar contraseña
api.put(
    '/password/:id',
    [
        validateJwt,
        validUpdatePassword
    ],
    updatePassword
)

//Eliminar Usuario
api.delete(
    '/:id',
    [
        validateJwt
    ],
    deleteUser
)

//Exportar
export default api
