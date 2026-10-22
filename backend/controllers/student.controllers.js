const Student= require("../models/student.model")

const getStudents= async (req,res)=>{

try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

    let students=await Student.find(query).skip(skip).limit(limit);

    if(!students){
        return res.status(404).json({success:false, message: "No Students found" });
    }
    const totalStudents = await Student.countDocuments(query);

    
    return res.status(200).json({
        success:true,
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        totalStudents,
        students:students
    })

}
catch(err){
    console.log(err);
    return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
}
}

const getStudentsById= async(req,res)=>{
    try{
        
        let studentId= req.params.id;
        let student =await Student.findById(studentId);
        
        if (!student) { 
            return res.status(404).json({ 
                success:false,
                message: "Student not found" 
            });
        }
        
        return res.status(200).json({
            success:true,
            student:student
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({ 
            success: false, 
            message: "Invalid Student ID or Server Error" 
        });
    }
    
}

const createStudents=async (req,res)=>{
    try{
        const {name,email,course,age}=req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student with this email already exists"
            });
        }
        
        let student = await Student.create({
        userId: req.user._id,
        name,
        email,
        course,
        age
    })
    
    return res.status(201).json({
        success:true,
        message:"Student created successfully",
        student:student
    });
}catch(err){
    console.log(err);
    return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
}   
};

const updateStudentsById= async (req,res)=>{

    try{

        let studentId= req.params.id;
        let updateStudent= await Student.findByIdAndUpdate(
            studentId,
            req.body,
            { new: true, runValidators: true });

        if (!updateStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student: updateStudent
        });



    }catch(err){
        console.log(err);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });

    }

};


const deleteStudentsById=async (req,res)=>{


    try{
        let studentId=req.params.id;
        let deleteStudent=await Student.findByIdAndDelete(
            studentId,

        );

        if (!deleteStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            student: deleteStudent
        });

}catch(err){
    console.log(err);
      return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });

}
};

module.exports={
    getStudents,
    getStudentsById,
    createStudents,
    updateStudentsById,
    deleteStudentsById
}