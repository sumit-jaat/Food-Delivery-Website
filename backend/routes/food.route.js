import express,{Router} from 'express';
import { addFood, listFood, removeFood } from '../controllers/food.controller.js';
import { upload } from '../middlewares/multer.middleware.js';


const foodRouter = Router();

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export {foodRouter}