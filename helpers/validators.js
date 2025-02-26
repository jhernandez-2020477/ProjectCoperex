import { body } from "express-validator"
import { validateErrors , validateErrorWithoutImg} from "./validate.error.js";
import { existUsername, existEmail } from "./db.validators.js";

export const registerValidation = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8}),
    validateErrors
]

export const validUpdateUser = [
    body('name', 'Name is optional')
        .optional(),
    body('surname', 'Surname is optional')
        .optional(),
    body('username', 'Username is optional')
        .optional()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email is optional or is not a valid email')
        .optional()
        .isEmail()
        .custom(existEmail),
    validateErrors
]

export const validUpdatePassword = [
    body('currentPassword', 'Current password cannot be empty')
        .notEmpty() 
        .withMessage('Password cannot be empty'),
    body('newPassword', 'New password cannot be empty')
        .notEmpty()
        .withMessage('Your new password cannot be empty')
        .isStrongPassword()
        .withMessage('Your new password must be strong')
        .isLength({ min: 8 }) 
        .withMessage('New password must be at least 8 characters long'),
        validateErrorWithoutImg
]

//Validacines del login
export const loginValidation = [
    body('userLoggin', 'Username or Email cannot be empty')
        .notEmpty()
        .isLowercase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .isLength()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrorWithoutImg
]

//CATEGORIA
export const validSaveCate = [
    body('name', 'Name cannot be empty')
        .notEmpty() 
        .isLength({ max: 50 })
        .withMessage('Can´t be overcome 50 characters'),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({ max: 150 })
        .withMessage('Can´t be overcome 150 characters'),       
        validateErrorWithoutImg
]

export const validUpdateCate = [
    body('name', 'Name cannot is optional')
        .optional() 
        .isLength({ max: 50 })
        .withMessage('Can´t be overcome 50 characters'),
    body('description', 'Description is optional')
        .optional()
        .isLength({ max: 150 })
        .withMessage('Can´t be overcome 150 characters'),       
        validateErrorWithoutImg
]

//EMPRESA

export const validSaveCompany = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({ max: 25 })
        .withMessage('Can´t be overcome 25 characters'),
    body('impactLevel', 'Impact Level can no be empty')
        .toUpperCase()  
        .notEmpty()
        .isIn(['BAJO', 'MEDIO', 'ALTO'])
        .withMessage('Impact Level must be either "BAJO","MEDIO" or "ALTO"'),
    body('yearsOfExperience', 'Years Of Experience cannot be empty and must be number')
        .notEmpty()
        .withMessage('Can´t be overcome 10 characters'),
    body('businessCategory', 'Business Category cannot be empty')
        .notEmpty(),
    body('direction', 'Direction cannot be empty')
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Can´t be overcome 100 characters'),
    body('contact', 'Contact cannot be empty')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Can´t must 8 numbers')
        .isLength({ max: 13 })
        .withMessage('Can´t be overcome 13 characters'),
        validateErrorWithoutImg
]

export const validUpdateCompany = [
    body('name', 'Name is Optional')
        .optional()
        .isLength({ max: 25 })
        .withMessage('Can´t be overcome 25 characters'),
    body('impactLevel', 'Impact Level is Optional')
        .toUpperCase()  
        .optional()
        .isIn(['BAJO', 'MEDIO', 'ALTO'])
        .withMessage('Impact Level must be either "BAJO","MEDIO" or "ALTO"'),
    body('yearsOfExperience', 'Years Of Experience is Optional')
        .optional()
        .isLength({ max: 10 })
        .withMessage('Can´t be overcome 10 characters'),
    body('businessCategory', 'Business Category is Optional')
        .optional(),
    body('direction', 'Direction is Optional')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Can´t be overcome 100 characters'),
    body('contact', 'Contact is Optional')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Can´t must 8 numbers')
        .isLength({ max: 13 })
        .withMessage('Can´t be overcome 13 characters'),
        validateErrorWithoutImg
]