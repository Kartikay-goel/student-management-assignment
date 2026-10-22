const mongoose= require("mongoose");


let userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,   
    },

},
{
    timestamps:true,
});

let User= mongoose.model("User",userSchema);
module.exports =User;