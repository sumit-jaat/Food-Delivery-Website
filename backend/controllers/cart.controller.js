import userModel from '../models/user.model.js'

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id:req.userId});
        let cartData = userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId,{cartData})
        res.json({
            success:true,
            message:"Added to cart"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while adding to cart"
        })
    }
}


const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData;

        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({
            success:true,
            message:"Removed from cart"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while removing from cart"
        })
    }
}


const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData;
        res.json({
            success:true,
            cartData,
            message:"Got cart"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while fetching cart"
        })
    }
}

export { addToCart, removeFromCart, getCart }