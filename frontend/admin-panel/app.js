// ======================
// 🔐 LOGIN (1 SEL)
// ======================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));

    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Login failed ❌";
  }
}

// ======================
// 📊 TOKEN
// ======================
const token = localStorage.getItem("token");

// ======================
// 📊 LOAD STATS
// ======================
async function loadStats() {
  const res = await fetch("http://localhost:3000/api/videos");
  const data = await res.json();

  document.getElementById("videos").innerText = data.length;
}

// ======================
// 🎬 UPLOAD VIDEO (FILE)
// ======================
async function uploadVideo() {
  const title = document.getElementById("title").value;
  const video = document.getElementById("video").files[0];
  const thumbnail = document.getElementById("thumbnail").files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("video", video);
  formData.append("thumbnail", thumbnail);

  await fetch("http://localhost:3000/api/videos/upload", {
    method: "POST",
    headers: {
      "Authorization": token
    },
    body: formData
  });

  alert("Video uploaded 🔥");

  loadVideos();
  loadStats();
}

// ======================
// 📺 LOAD VIDEOS
// ======================
async function loadVideos() {
  const res = await fetch("http://localhost:3000/api/videos");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(v => {
    list.innerHTML += `
      <div class="card">
        <h3>${v.title}</h3>
        <button onclick="deleteVideo('${v._id}')">Delete</button>
      </div>
    `;
  });
}

// ======================
// ❌ DELETE VIDEO
// ======================
async function deleteVideo(id) {
  await fetch(`http://localhost:3000/api/videos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": token
    }
  });

  alert("Video deleted 🔥");

  loadVideos();
  loadStats();
}

// ======================
// 👥 ADD ADMIN
// ======================
async function addAdmin() {
  const email = document.getElementById("aemail").value;
  const password = document.getElementById("apass").value;

  await fetch("http://localhost:3000/api/admin/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      email,
      password,
      role: "admin"
    })
  });

  alert("Admin added 🔥");
}

// ======================
// 🚀 INIT DASHBOARD
// ======================
if (window.location.pathname.includes("dashboard")) {
  loadStats();
  loadVideos();
}