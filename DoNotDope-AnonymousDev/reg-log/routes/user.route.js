const express =require('express');
const router= express.Router();


const { register, login ,logout ,getMyProfile, getAdmins } = require('../controller/user.controler.js');

const  {isAuthenticated} =require('../jwt/Authtoken.js')

// console.log({ isAuthenticated });

router.post('/register',register)
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)

router.get('/my-profile',isAuthenticated,getMyProfile)

router.get('/admins',getAdmins)

module.exports=router;
