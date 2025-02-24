//Configuraciones del servidor de express

'use strict'
//ECModules
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos JSON
    app.use(express.urlencoded({extended: false})) //No encriptar
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    //Rutas públicas
    app.use(authRoutes)

    //Rutas privadas
}

export const initServer = async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}