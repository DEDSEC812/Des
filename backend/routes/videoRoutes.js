const router = require("express").Router();
const ctrl = require("../controllers/videoController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// 📺 GET VIDEOS
router.get("/", ctrl.getVideos);

// 🎬 UPLOAD VIDEO (FILE)
router.post(
  "/upload",
  auth(["admin", "owner"]),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  ctrl.uploadVideo
);

// 👁️ ADD VIEW
router.put("/:id/view", ctrl.addView);

// ❤️ ADD LIKE
router.put("/:id/like", ctrl.addLike);

// ❌ DELETE VIDEO
router.delete("/:id", auth(["admin", "owner"]), ctrl.deleteVideo);

module.exports = router;
