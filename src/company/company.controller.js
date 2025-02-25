//Controlador de Empresa
import Company from '../company/company.model.js'
import Category from '../category/category.model.js'

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