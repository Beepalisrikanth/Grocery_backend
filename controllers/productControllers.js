import product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        const { name, desc, category, unit, price } = req.body
        const image = req.file?.path || null;


        const products = await product.create({
            name, desc, category, unit, price, image
        })

        return res.status(201).json({
            message: "product created successfully",
            products,
            success: true
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: `server error ${error}`,
            success: false
        })
    }
}


export const getProduct = async (req, res) => {
    try {
        const newproduct = await product.find()

        return res.status(200).json({
            message: "product are fetched successfully",
            newproduct,
            success: true
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `server error @${error}`,
            success: false
        })
    }
}

export const getProductByCategory = async (req, res) => {
    try {

        const { category } = req.body

        if (!category) {
            return res.status(404).json({
                message: "category is required",
                success: false
            })
        }

        const getProducts = await product.find({ category: category })

        res.status(200).json({
            message: "product list fetched successfully",
            getProducts,
            success: true
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error",
            success: false
        })
    }
}

export const getProductByName = async (req, res) => {
    try {
        const { name } = req.body

        const productName = await product.find({
            name: { $regex: `^${name}`, $options: "i" }
        })

        res.status(200).json({
            message: "product details fetched",
            productName,
            success: true
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error",
            success: false
        })
    }
}

