import { Router } from 'express';
import { isAuth } from '../middlewares/isAuth.js'
import { createAndEditShop, getMyShop } from '../controllers/shop.controller.js';
import { addItem } from '../controllers/item.controller.js';
import uploadCloudinary from '../config/cloudinary.js';
import { upload } from '../middlewares/multer.js';

const shopRouter = Router();

shopRouter.post("/create-edit", isAuth, upload.single("image"), createAndEditShop);
shopRouter.get("/getMyShop", isAuth, getMyShop);


export default shopRouter;