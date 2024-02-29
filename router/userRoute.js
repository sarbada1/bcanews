import express from 'express';
import uploadMiddleware from '../middleware/UploadMiddleware.js';
import UserController from "../controller/UserController.js";

const userRoute= express.Router();
const userInstance=new UserController();
const uploadInstance=new uploadMiddleware();
const upI=uploadInstance.upload("users");

userRoute.get('/',userInstance.index);
userRoute.post('/',upI.single("image"),userInstance.store);
userRoute.get('/:id', userInstance.show);
userRoute.delete('/:id', userInstance.destroy);
userRoute.put("/:id", userInstance.update);



export default userRoute;