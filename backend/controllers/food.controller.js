import foodModel from "../models/food.model.js";
import fs from 'fs';
    
// add food item

const addFood = async(req,res) => {

    const {name,description,price,category} = req.body;
    const image_filename = `${req.file.filename}`
    
    const food = new foodModel({
        name:name,
        description:description,
        price:price,
        category:category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in adding food"})
    }
}

// all list food

const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({})
        res.json({
            success:true,
            data:foods,
            message:"All foods listed successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while uploading list"
        })
    }
}
    
    //remove Food

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body._id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body._id);
        res.json({
            success:true,
            message:"Food Removed"
    })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error in removing image"
        })
    }
}


export {addFood, listFood, removeFood}