import User from "../models/user.js"
import jwt from "jsonwebtoken"

export async function getUser (req, res){
    try {
      const cookie = req.cookies["jwt"]
      const claims = jwt.verify(cookie,"secret")

      if (!claims) {
        return res.status(401).send({
          message: "Sin Autorización"
        })
      }
  
      const user = await User.findOne({_id:claims._id})
      const {password,...data} = user.toJSON()
      res.send(data)
  
    } catch (error) {
        return res.status(401).send({
           error: console.log(error)
            
          })
    }
}


export async function getUserById (req,res){
  const userId = req.params.id
  try {
    const user = await User.findOne({_id: userId})
    res.send(user)
  } catch (error) {
    console.log(error);
  }
}