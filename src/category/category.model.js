//Modelo de categoria
import mongoose, { Schema, model} from "mongoose"

const categorySchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can´t be overcome 50 characters`],
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            maxLength: [150, `Can´t be overcome 150 characters`],
            required: [true, 'Description is required']
        }
    }
)

//Crear y exportar el modelo
export default model('Category', categorySchema)