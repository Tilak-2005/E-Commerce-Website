import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js'


const createToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET)
}


const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message : "User Not Found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createToken(user._id);
            return res.json({success:true,token})
        }
        else{
            return res.json({success:false, message : "Password Does Not Match"});
        }

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message : "User alreay exist"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message : "Please Enter A Valid Email"});
        }
        if(password.length < 8){
            return res.json({success:false, message : "Please Enter A Strong Password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({success : true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message : error.message})
    }
}

const adminLogin = async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


export {loginUser,registerUser,adminLogin}