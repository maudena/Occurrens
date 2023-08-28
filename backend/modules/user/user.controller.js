import User from "./user.model.js"
import jwt from "jsonwebtoken"

export async function getUser (req, res){
    try {
      const cookie = req.cookies["jwt"]
      if (!cookie) {
        return res.status(401).send({           
          message: "Sin Autorización",            //VERIFICACION JWT
        });
      }
      
      const claims = jwt.verify(cookie,"secret")

      if (!claims) {
        return res.status(401).send({
          message: "Sin Autorización"
        })
      }                                         
  
      const user = await User.findOne({_id:claims._id}).populate('userEvents')
      res.send(user.toJSON())
      
  
    } catch (error) {
        return res.status(401).send({
           error: console.log(error)
            
          })
    }
}


export async function getUserById (req,res){
  const userId = req.params.id
  try {
    const user = await User.findOne({_id: userId}).populate('userEvents')
    res.send(user)
  } catch (error) {
    console.log(error);
  }
}