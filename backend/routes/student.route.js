const express= require("express");
const router=express.Router();
const {getStudents,getStudentsById,createStudents,updateStudentsById,deleteStudentsById} = require("../controllers/student.controllers");


//creating a student 
router.post('/',createStudents);

//get students
router.get('/',getStudents);

router.get('/:id',getStudentsById);

//update students  by id

router.put('/:id',updateStudentsById);

//delete students by id

router.delete('/:id', deleteStudentsById);

module.exports = router;