import { Router } from "express";
import { postRegister } from "../controllers/register.controller.js";
import { getUser, getUserById } from "../controllers/user.controller.js";
import { postLogin, postLogout } from "../controllers/login.controller.js";
import { getHome } from "../controllers/home.controller.js";
import { deleteEvento, getEvento, getEventos, postNewEvento, putEvento, getEventsByCategory } from "../controllers/event.controller.js";

const router = Router();


//----ESTAS RUTAS SE REDIRECCIONAN A /API/*RUTA----//

//------LOGIN, REGISTRO, LOGOUT-------//
router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/logout", postLogout)
router.get("/user", getUser);
router.get("/user/:id",getUserById)


//------HOME-------//
router.get("/home", getHome)

//------EVENTOS------//
router.post("/new-evento", postNewEvento)
router.get("/eventos", getEventos)
router.get("/evento/:id", getEvento)
router.get("/eventos/:category", getEventsByCategory)
router.get("/update-eventos", getEvento)
router.put("/update-evento/:id", putEvento)
router.delete("/delete-evento/:id", deleteEvento)




export default router;
