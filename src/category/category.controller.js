//Lógica de categoria
import Category from '../category/category.model.js'

//Crear Categoria
export const saveCategory = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send(
            {
                message: `Category added successfully, the category added was: ${category.name}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General Error creating Category',
                err
            }
        )
    }
}

//Obtener todas las categorias
export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)
        if(categories.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Categories not found :('
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Categories found :)',
                total: categories.length,
                categories
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


