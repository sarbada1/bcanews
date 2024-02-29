import express from "express";

import LoginController from "../controller/LoginController.js";

const loginRoute=express.Router();
const loginInstance=new LoginController();

loginRoute.post('/',loginInstance.login);

export default loginRoute;