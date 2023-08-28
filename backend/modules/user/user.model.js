import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    avatar:{
      
    },
    category:{
        type: String,
        required: true
    },
    userEvents:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Evento' }],


})

const User = mongoose.model('User', userSchema);

export default User