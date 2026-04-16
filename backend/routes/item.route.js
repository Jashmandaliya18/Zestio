import { Router } from 'express';
import { isAuth } from '../middlewares/isAuth.js'
import { addItem, editItem } from '../controllers/item.controller.js';
import { upload } from '../middlewares/multer.js';

const itemRouter = Router();

itemRouter.post("/addItem", isAuth, upload.single("image"), addItem);
itemRouter.put("/editItem/:id", isAuth, upload.single("image"), editItem);


export default itemRouter;