import { Router } from "express";
import { register } from "../modules/login-register/register.controller.js";
import { getUser, getUserById } from "../modules/user/user.controller.js";
import { login, logout } from "../modules/login-register/login.controller.js";
import EventController from "../modules/events/event.controller.js"
const router = Router();


//----ESTAS RUTAS SE REDIRECCIONAN A /API/*RUTA----//

//------LOGIN, REGISTRO, LOGOUT-------//
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/user", getUser);
router.get("/user/:id", getUserById)


//------HOME-------//
router.get("/home", EventController.findAll)

//------EVENTOS------//
router.post("/new-evento", EventController.newEvent)
router.get("/eventos", EventController.findAll)
router.get("/evento/:id", EventController.findById)
router.get("/update-evento/:id", EventController.findOneForUpdate)
router.get("/eventos/:category", EventController.findByCategory)
router.get("/update-eventos", EventController.newEvent)
router.put("/update-evento/:id", EventController.updateOne)
router.delete("/delete-evento/:id", EventController.deleteOne)




export default router;
