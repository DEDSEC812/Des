const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// IMPORT MODEL
const Admin = require("./models/Admin");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// 🔗 CONNECT MONGODB
// ======================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");

  // ======================
  // 🔐 CREATE DEFAULT ADMIN
  // ======================
  createDefaultAdmin();
})
.catch(err => console.log(err));

// ======================
// 🔐 DEFAULT ADMIN FUNCTION
// ======================
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
  } else {
    console.log("✅ Admin already exists");
  }
}

// ======================
// ROUTES
// ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));

// ======================
app.get("/", (req,res)=>{
  res.send("CRONCUL API RUNNING");
});

// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});
