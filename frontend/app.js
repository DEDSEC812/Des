let allMovies = [];

// BACKEND API
const API = "https://des-02.onrender.com";

// LOAD MOVIES
async function loadMovies() {
  const res = await fetch(`${API}/api/videos`);
  const data = await res.json();

  allMovies = data;
  displayMovies(data);
}

// DISPLAY FUNCTION
function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  movies.forEach(v => {
    container.innerHTML += `
      <div class="card">
        <h3>${v.title}</h3>
        <p>👁️ ${v.views || 0} views</p>
        <p>❤️ ${v.likes || 0} likes</p>

        <button onclick="watchMovie('${v._id}','${v.videoUrl}')">
          ▶ Watch
        </button>

        <button onclick="likeMovie('${v._id}')">
          ❤️ Like
        </button>
      </div>
    `;
  });
}

// SEARCH FUNCTION
function searchMovie() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = allMovies.filter(v =>
    v.title.toLowerCase().includes(value)
  );

  displayMovies(filtered);
}

// WATCH MOVIE (FIXED)
async function watchMovie(id, url) {
  await fetch(`${API}/api/videos/${id}/view`, {
    method: "PUT"
  });

  window.location.href =
    "player.html?id=" + id +
    "&url=" + encodeURIComponent(url);
}

// LIKE MOVIE (FIXED)
async function likeMovie(id) {
  await fetch(`${API}/api/videos/${id}/like`, {
    method: "PUT"
  });

  loadMovies();
}

// INIT
loadMovies();
