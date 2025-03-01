import ExcelJS from 'exceljs'; 
import Company from '../company/company.model.js'; 
import Report from '../report/report.model.js'; 
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

// Generar Reporte
export const generateReport = async (req, res) => {
    try {
        // Obtener todas las empresas
        const companies = await Company.find().populate(
            {
                path: 'businessCategory',
                select: 'name description -_id',
            }
        )

        if (companies.length === 0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'No companies found to generate a report.',
                }
            )
        }

        // Crear una nueva instancia de ExcelJS Workbook
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Companies Report')

        // Definir las columnas del Excel
        worksheet.columns = [
            { header: 'Nombre de Empresa', key: 'name', width: 30 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 30 },
            { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 20 },
            { header: 'Categoria Empresarial', key: 'category', width: 30 },
            { header: 'Dirección', key: 'direction', width: 30 },
            { header: 'Contacto', key: 'contact', width: 30 },
            { header: 'Created At', key: 'registrationDate', width: 30 },
        ]

        // Agregar las filas de las empresas al Excel
        companies.forEach(company => {
            worksheet.addRow(
                {
                    name: company.name,
                    impactLevel: company.impactLevel,
                    yearsOfExperience: company.yearsOfExperience,
                    category: company.businessCategory ? company.businessCategory.name : 'N/A',
                    direction: company.direction,
                    contact: company.contact,
                    registrationDate: company.registrationDate,
                }
            )
        })

        // Definir la ruta de almacenamiento del archivo Excel
        const directoryPath = join(CURRENT_DIR, '../../uploadsReport/reports') // Ruta donde se almacenará el archivo
        const filePath = join(directoryPath, `report_${Date.now()}.xlsx`) // Nombre del archivo con timestamp

        // Verificar si el directorio existe, si no, crear uno
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true })
        }

        // Guardar el archivo Excel en la ruta especificada
        await workbook.xlsx.writeFile(filePath)

        // Crear un registro en el modelo Report con la información del archivo generado
        const report = new Report(
            {
                companies: companies.map(company => company._id), // IDs de las empresas
                exelFile: filePath, // Ruta del archivo Excel
            }
        )

        await report.save()

        // Responder con el enlace al archivo generado
        return res.send(
            {
                success: true,
                message: 'Report generated successfully',
                report,
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error generating report',
                err,
            }
        )
    }
}

//Obtener todas los Reportes
export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const reports = await Report.find()
            .skip(skip)
            .limit(limit)
            .populate(
                {
                    path: 'companies',
                    select : 'name -_id'
                }
            )
        if(reports.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Reports not found :('
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Reports found :)',
                total: reports.length,
                reports
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}

