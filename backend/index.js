require("dotenv").config();
const express= require("express");
const app= express();
const connectDB = require("./config/mongodb");
const cors= require("cors");
const authMiddleware= require("./middlewares/authMiddleware")


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use('/api/auth',require('./routes/user.route'))
app.use('/api/students',authMiddleware ,require('./routes/student.route'))

app.listen(process.env.PORT,function(){
    console.log("Server is running on port 3000");
});