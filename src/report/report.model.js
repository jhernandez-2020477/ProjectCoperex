//Modelo de Reporte
import mongoose, { Schema, model } from "mongoose";

const reportSchema = Schema(
    {
        generationDate: {
            type: Date,
            default: Date.now
        },
        companies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company', 
                //required: true
            }
        ],
        exelFile: {
            type: String
        }
    }
)

//Crear y exportar
export default model('Report', reportSchema)