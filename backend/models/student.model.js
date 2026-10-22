const mongoose=require("mongoose");

let studentSchema=mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    course:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        required:true,
        min:1
    }
});

let Student= mongoose.model("Student",studentSchema);
module.exports= Student;