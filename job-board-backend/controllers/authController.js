require('dotenv').config();
const { json } = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async (req , res) =>{
    const {name , email , password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({success:false , message:"Please fill all details"})
    }
    try{
        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({success:false , message:"User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new userModel({name , email , password:hashedPassword})
      
        await newUser.save();
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        console.log(token)
        
        return res.status(200).json({success:true , message:"User created successfully",token})

    }catch(error){
        res.json({success:false , message:error.message})
    }
}

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      success: true,
      message: "Login successful",
      token, // ⬅️ return token in response
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {register , login}