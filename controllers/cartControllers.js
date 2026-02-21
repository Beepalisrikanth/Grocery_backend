import user from "../models/userModel.js";
import product from "../models/productModel.js";
import cart from "../models/cartModel.js";


export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body

        if (!productId || !quantity) {
            return res.status(404).json({
                message: "required fields are missing",
                success: false
            })
        }

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "please add a product"
            })
        }

        const productExits = await product.findById(productId)
        if (!productExits) {
            return res.status(400).json({
                message: "product not found"
            })
        }

        let Cart = await cart.findOne({ user: userId })
        if (!Cart) {
            Cart = await cart.create({
                user: userId,
                items: [{
                    product: productId,
                    quantity
                }]
            })
            return res.status(200).json({
                message: "product added successfully",
                Cart,
                success: true
            })
        }

        const itemindex = Cart.items.findIndex(
            item => item.product.toString() === productId
        )
        if (itemindex > -1) {
            Cart.items[itemindex].quantity += quantity
        } else {
            Cart.items.push({ product: productId, quantity })
        }

        await Cart.save()

        res.status(200).json({
            message: "product added successfully",
            success: true
        })


    }
    catch (error) {
        console.log(error),
            res.status(500).json({
                message: "server error",
                success: false
            })
    }
}

export const viewCart = async (req, res) => {
    try {
        const userId = req.userId

        const viewProducts = await cart.findOne({ user: userId })
        if (!viewProducts) {
            return res.status(404).json({
                message: "cart was empty"
            })
        }
        return res.status(200).json({
            message: "view product fetched successfully",
            viewProducts,
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

export const updateQunatity = async (req, res) => {
    try {
        const userId = req.userId

        const { productId, quantity } = req.body

        if (!productId || !quantity) {
            return res.status(404).json({
                message: "required fields are missing",
                success: false
            })
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "quantity must be at least 1",
                success: false
            })
        }

        const cartDoc = await cart.findOne({ user: userId });

        if (!cartDoc) {
            return res.status(404).json({
                message: "cart is empty",
                success: false
            })
        }

        const itemIndex = cartDoc.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "product not found in cart",
                success: false
            })
        }

        cartDoc.items[itemIndex].quantity = quantity

        await cartDoc.save();

        res.status(200).json({
            message: "product quantity is upadated",
            cartDoc,
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

export const deleteItem = async (req, res) => {
    try {
        const userId = req.userId

        const { productId } = req.body

        if (!productId) {
            return res.status(404).json({
                message: "product id is required",
                success: false
            })
        }

        const cartDoc = await cart.findOne({ user: userId })

        if (!cartDoc) {
            return res.status(404).json({
                message: "cart not found",
                success: false
            })
        }

        const itemIndex = cartDoc.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "product not found in cart",
                success: false
            })
        }

        cartDoc.items.splice(itemIndex, 1)

        await cartDoc.save()

        res.status(200).json({
            message: "product remove from cart successfully",
            cart: cartDoc,
            success: true
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error",
            success: true
        })
    }

}