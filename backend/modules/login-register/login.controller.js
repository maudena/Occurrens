import User from "../user/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function login (req,res){
    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send({
            message: "No existe el usuario"
        })
    }

    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).send({
            message: "Contraseña incorrecta"
        })

    }

    const token = jwt.sign({_id:user._id},"secret")

    res.cookie("jwt",token,{
        httpOnly: true,
        maxAge: 24*60*60*1000
    })

    res.send({
        message:"success"
    })

}


export async function logout(req,res){
    res.cookie("jwt","",{maxAge: 0})
    res.send({
      message: "success"
    })
  } 