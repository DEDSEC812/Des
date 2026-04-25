const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req,res)=>{
  const {email,password} = req.body;

  const admin = await Admin.findOne({email});
  if(!admin) return res.status(400).json({message:"Admin not found"});

  const ok = await bcrypt.compare(password, admin.password);
  if(!ok) return res.status(400).json({message:"Wrong password"});

  const token = jwt.sign({id:admin._id}, process.env.JWT_SECRET);
  res.json({token, admin});
};
