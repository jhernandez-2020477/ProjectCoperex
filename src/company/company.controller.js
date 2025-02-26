//Controlador de Empresa
import Company from '../company/company.model.js'
import Category from '../category/category.model.js'
import Report from '../report/report.model.js'

//Agregar publicación
export const saveCompany = async(req, res)=>{
    try {
        const { businessCategory } = req.body
        let data = req.body

        // Verificar si la categoría existe
        const categoryid = await Category.findById(businessCategory)
        if (!categoryid) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category not found, cannot save this Company'
                }
            )
        }

        let company = new Company(data)
        await company.save()
        return res.send(
            {
                message: `Save Company successfully, the name is: ${company.name}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error creating Company',
                err
            }
        )
    }
}

//Editar Empresa 
export const updateCompany = async(req, res)=>{
    const { id } = req.params
    const { businessCategory, ...data } = req.body
    try {

        // Verificar si la categoría existe
        const categoryid = await Category.findById(businessCategory)
        if (!categoryid) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category not found, cannot update this Company'
                }
            )
        }
        const company = await Company.findById(id)

        if (!company) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Company not found, not updated'
                }
            )
        }
        const updateCompa = await Company.findByIdAndUpdate(
            id,
            {...data, businessCategory: businessCategory},
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'Company updated successfully :)',
                updateCompa
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when updating this Company',
                err
            }
        )
    }
}

//Obtener todas las Empresas
export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const companies = await Company.find()
            .skip(skip)
            .limit(limit)
            .populate(
                {
                    path: 'businessCategory',
                    select: 'name description -_id'
                }
            )
        if(companies.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Companies not found :('
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Companies found :)',
                total: companies.length,
                companies
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


//Obtener todas las Empresas con filtro por años de experiencia
export const getYearOfExperience = async(req, res) => {
    const { limit, skip, yearsOfExperience } = req.query

    let filter = {}
    if (yearsOfExperience) {
        const yearsRange = yearsOfExperience.split('-')
        
        if (yearsRange.length === 1) {
            filter.yearsOfExperience = yearsRange[0]
        } else if (yearsRange.length === 2) {
            filter.yearsOfExperience = { $gte: yearsRange[0], $lte: yearsRange[1] }
        }
    }
    try {
        const companies = await Company.find(filter)
            .skip(skip)
            .limit(limit)
            .populate(
                {
                    path: 'businessCategory',
                    select: 'name description -_id',
                }
            )

        if (companies.length === 0) {
            return res.send(
                {
                    success: false,
                    message: 'Companies not found :(',
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Companies found :)',
                total: companies.length,
                companies,
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err,
            }
        )
    }
}

// Filtrar Empresas por Categoría
export const getByCategory = async (req, res) => {
    const { limit, skip, categoryId } = req.query

    let filter = {}

    if (categoryId) {
        filter.businessCategory = categoryId
    }

    try {
        const companies = await Company.find(filter)
            .skip(skip)
            .limit(limit)
            .populate(
                {
                    path: 'businessCategory',
                    select: 'name description -_id', 
                }
            )

        if (companies.length === 0) {
            return res.send(
                {
                    success: false,
                    message: 'No companies found in this category',
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Companies found :)',
                total: companies.length,
                companies,
            }
        )
    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving companies by category',
                err,
            }
        )
    }
}

// Obtener todas las Empresas con orden
export const getAllAZOrZA = async (req, res) => {
    const { limit, skip, sortOrder } = req.query

    let sort = {}
    if (sortOrder === 'asc') {
        sort.name = 1; // Ascendente (A-Z)
    } else if (sortOrder === 'desc') {
        sort.name = -1; // Descendente (Z-A)
    }

    try {
        const companies = await Company.find()
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .populate(
                {
                    path: 'businessCategory',
                    select: 'name description -_id', 
                }
            )
        if (companies.length === 0) {
            return res.send(
                {
                    success: false,
                    message: 'No companies found',
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Companies found :)',
                total: companies.length,
                companies,
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving companies with sorting',
                err,
            }
        )
    }
}

