const Admin = require("./models/Admin");
const bcrypt = require("bcrypt");

async function createDefaultAdmin() {
  const exist = await Admin.findOne({ email: "admin@croncul.com" });

  if (!exist) {
    const hashed = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@croncul.com",
      password: hashed,
      role: "superadmin"
    });

    console.log("🔥 Default admin created");
  }
}

module.exports = createDefaultAdmin;
