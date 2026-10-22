const jwt= require("jsonwebtoken");

const authMiddleware=(req,res,next) => {

    try{

            const token = req.headers.authorization.split(" ")[1];
            console.log(token);

            if(!token){
               return res.status(401).json({message:"Unauthorized"});
            }

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);

            if(!decoded){
                  return res.status(401).json({message:"Unauthorized"});
            }
            req.user=decoded;
            next()


    }catch(err){
        console.log(err);
        res.status(401).json({message:"Unauthorized"});
    }
};

module.exports = authMiddleware;