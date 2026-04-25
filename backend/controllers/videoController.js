const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");

// ======================
// 📺 GET VIDEOS
// ======================
exports.getVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

// ======================
// 🎬 UPLOAD VIDEO (CLOUDINARY)
// ======================
exports.uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;

    const videoFile = req.files.video[0];
    const thumbFile = req.files.thumbnail[0];

    // upload video
    const videoResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(videoFile.buffer);
    });

    // upload thumbnail
    const thumbResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(thumbFile.buffer);
    });

    const video = await Video.create({
      title,
      videoUrl: videoResult.secure_url,
      thumbnail: thumbResult.secure_url,
      uploadedBy: req.user.id
    });

    res.json(video);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// ======================
// ❌ DELETE VIDEO
// ======================
exports.deleteVideo = async (req, res) => {
  const { id } = req.params;

  await Video.findByIdAndDelete(id);

  res.json({ message: "Video deleted 🔥" });
};

// ======================
// 👁️ ADD VIEW
// ======================
exports.addView = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );

  res.json(video);
};

// ======================
// ❤️ ADD LIKE
// ======================
exports.addLike = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  res.json(video);
};