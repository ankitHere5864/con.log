const User=require ('../models/user.model.js')
const bcrypt=require('bcrypt')
const Createtokenandsavecookie=require('../middleware/authenticate.js')

// const jwt=require('jsonwebtoken')

const register=async(req,res)=>{ 
    try {
        // const{photo}=req.files;
        // const allowedFormats=["jpg","png","jpeg"];

        const{name,email,password}=req.body;
        const user =await User.findOne({email});
        if (user) {
            return res.status(400).json({message:"user already exists"})
        }
        const hashpass=await bcrypt.hash(password,10)
        const createduser=new User({
            
            name:name,
            email:email,
            password:hashpass,
            
        })
        await createduser.save()
        if(createduser){
            await Createtokenandsavecookie(createduser._id,res)
            res.status(201).json({
                message:"user created sucsfly",
                token:createduser.token
                
            })
            
        }
    } catch (error) {
        console.log("error at user register db",error)
        res.status(500).json({message:"internal server error at DB"})
    }
} ;

//* Login here=================================================//
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        // User not found
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Validate role (e.g., only allow 'user' role to login)
      // if (user.role !== role) {
      //   return res.status(403).json({ message: "Role mismatch. Access denied." });
      // }
  
      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        // Password doesn't match
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate token and send response
      const token = await Createtokenandsavecookie(user._id, res);
  
      res.status(200).json({
        message: "Logged in successfully",
        user: {
          
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //* Logout from here========================================//
  const logout =async(req,res) => {
    try {
      await res.clearCookie('jwt');
      await res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("error at logout",error)
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //*==============MyProfile=====================
  const getMyProfile = async (req, res) => {
    const user = await req.user;
    res.status(200).json({ user });
  };
  //*===============Admin=======================
  const getAdmins = async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
  };

  module.exports={register,login,logout,getMyProfile,getAdmins}