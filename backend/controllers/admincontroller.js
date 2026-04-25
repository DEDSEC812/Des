const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.createAdmin = async (req, res) => {
  const { email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    email,
    password: hash,
    role: role || "admin"
  });

  res.json({ message: "Admin created 🔥", admin });
};