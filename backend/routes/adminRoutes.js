const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post("/create", auth(["owner"]), async (req, res) => {
  const { email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    email,
    password: hash,
    role: role || "admin"
  });

  res.json(admin);
});

module.exports = router;