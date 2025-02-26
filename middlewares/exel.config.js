import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const ALLOWED_MIMETYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
const MAX_SIZE = 10000000 // 10MB

// Configuración de Multer
const multerConfig = (destinationPath) => {
    return multer(
        {
            storage: multer.diskStorage(
                {
                        destination: (req, file, cb) => {
                            const fullPath = join(CURRENT_DIR, destinationPath)
                            req.filePath = fullPath
                            cb(null, fullPath) // Define el directorio de almacenamiento
                    },
                        filename: (req, file, cb) => {
                            const fileExtension = extname(file.originalname)
                            const fileName = file.originalname.split(fileExtension)[0]
                            cb(null, `${fileName}-${Date.now()}${fileExtension}`)
                    }
                }
            ),
            fileFilter: (req, file, cb) => {
                if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
                    cb(null, true) // Si el archivo es un Excel, lo permite
                } else {
                    cb(new Error('Only .xlsx files are allowed')) // Rechaza otros archivos
                }
            },
            limits: {
                fileSize: MAX_SIZE 
            }
        }
    )
}

// Middleware para manejar los archivos Excel
export const uploadExcelReport = multerConfig('../uploadsReport/reports')
