import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export async function register(req,res){
    const {fullname, phone, category, email, username, password} = req.body

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const record = await User.findOne({ email: email });

  if (record) {
    return res.status(400).send({
      message: "El email que proporcionaste ya está registrado",
    });
  } else {
    const user = new User({
      fullname: fullname,
      phone:phone,
      email: email,
      username: username,
      password: hashedPassword,
      category:category
    });
    const newUser = await user.save();

    const {_id} = await newUser.toJSON()
    const token = jwt.sign({_id:_id},"secret")
    res.cookie("jwt", token,{
        httpOnly:true,
        maxAge: 24*60*60*1000
    })

    res.send({
      message: "success"
    });
  }
}