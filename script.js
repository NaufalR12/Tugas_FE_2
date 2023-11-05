//Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

//Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

//klik di luar untuk menghilangkan

const hamburger = document.querySelector("#hamburger-menu");
const searchButton = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

let movies;
const input = document.querySelector("#search-box");

function OnChangeSearch(searchParam) {
  const uniqueMovies = new Set(); // Membuat Set untuk menyimpan film unik berdasarkan judul

  axios
    .get("https://www.omdbapi.com/?apikey=d684a20e&s=" + searchParam)
    .then(function (response) {
      const movies = response.data.Search;

      if (movies) {
        movies.forEach((movie) => {
          const title = movie.Title;

          // Cek apakah judul film sudah ada dalam Set
          if (!uniqueMovies.has(title)) {
            uniqueMovies.add(title); // Tambahkan judul film ke Set
            axios
              .get("https://www.omdbapi.com/?apikey=d684a20e&t=" + title)
              .then(function (response) {
                console.log(response.data);
                const movieDetail = response.data;
                displayMovieCard(movieDetail);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      } else {
        const movieDetail = { Title: "Film tidak tersedia...", Poster: "" };
        displayMovieCard(movieDetail);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayMovieCard(movie) {
  const main = document.querySelector("#daftarFilm");

  const card = document.createElement("div");
  const title = document.createElement("h1");
  const img = document.createElement("img");
  const detailButton = document.createElement("button");

  card.className = "card";
  title.innerText = movie.Title;
  img.setAttribute("src", movie.Poster);
  img.setAttribute("title", movie.Title);

  detailButton.innerText = "Detail";
  detailButton.addEventListener("click", function () {
    showMovieDetails(movie);
  });

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(detailButton);
  main.appendChild(card);
}

function showMovieDetails(movie) {
  const popupDetail = document.createElement("div");
  popupDetail.className = "popupDetail";

  const cardDetail = document.createElement("div");
  cardDetail.className = "cardDetail";

  const details = `
    <h1>${movie.Title}</h1>
    <p>Type: ${movie.Type}</p>
    <p>Year: ${movie.Year}</p>
    <p>IMDB ID: ${movie.imdbID}</p>
    <p>Actors: ${movie.Actors}</p>
    <p>Genre: ${movie.Genre}</p>
    <p>Durasi: ${movie.Runtime}</p>
    <p>Rilis: ${movie.Released}</p>
  `;

  cardDetail.innerHTML = details;

  const closeButton = document.createElement("button");
  closeButton.innerText = "Tutup";
  closeButton.addEventListener("click", function () {
    document.body.removeChild(popupDetail);
  });

  cardDetail.appendChild(closeButton);

  popupDetail.appendChild(cardDetail);

  document.body.appendChild(popupDetail);
}
///////////
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchParam = input.value.trim();
    const main = document.querySelector("#daftarFilm");
    main.innerHTML = ""; // Membersihkan daftarFilm sebelum menambahkan kartu-kartu baru

    if (searchParam) {
      OnChangeSearch(searchParam);
    }
  }
});
