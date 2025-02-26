//Rutas de autenticación
import { Router } from 'express';
import { generateReport, getAll } from '../report/report.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

// Ruta para generar el reporte
api.get(
    '/generateReport',
    [
        validateJwt,
        isAdmin
    ], 
    generateReport
)

api.get(
    '/getAll',
    [
        validateJwt,
        isAdmin
    ],
    getAll
)

export default api