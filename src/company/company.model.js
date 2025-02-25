//Modelo de Empresa
import mongoose, { Schema, model } from "mongoose";

const companySchema = Schema(
    {
        name: {
            type: String,
            maxLength: [25, `Can´t be overcome 25 characters`],
            required: [true, 'Name is required']
        },
        impactLevel: {
            type: String,
            required: [true, 'Impact Level is required'],
            uppercase: true, 
            enum: ['BAJO', 'MEDIO', 'ALTO'],
        },
        yearsOfExperience: {
            type: String,
            maxLength: [10, `Can´t be overcome 10 characters`],
            required: [true, 'Years of Experience is required']
        },
        businessCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        direction: {
            type: String,
            maxLength: [100, `Can´t be overcome 100 characters`],
            required: [true, 'Direction is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required'],
            maxLength: [13, `Can´t be overcome 13 numbers`],
            minLength: [8, 'Contact must be 8 numbers']
        },
        registrationDate: {
            type: Date,
            default: Date.now
        }
    }
)

//Crear y exportar el model
export default model('Company', companySchema)