let movie;
const input = document.querySelector("#search");

// fetch("http://www.omdbapi.com/?i=tt3896198&apikey=97a06b3a&t=avengers")
//   .then((response) => response.json())
//   .then((response) => {
//     movie = response;

//     const main = document.querySelector("#main");
//     const card = document.createElement("div");
//     const title = document.createElement("h1");
//     const img = document.createElement("img");

//     card.className = "card";
//     title.innerText = movie.Title;
//     img.setAttribute("src", movie.Poster);
//     img.setAttribute("title", movie.Title);

//     card.appendChild(title);
//     card.appendChild(img);

//     main.appendChild(card);
//   });

//function OnChangeSearch(searchParam) {
//   fetch("http://www.omdbapi.com/?i=tt3896198&apikey=97a06b3a&s=" + searchParam)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((data) => (cards += showCards(data)));
//       const main = document.querySelector("#main");
//       main.innerHTML = cards;
//     });
// }

// function showCards(data) {
//   return `
//     <div class="card">
//             <h1>${data.Title}</h1>
//             <img src="${data.Poster}"
//                         title="${data.Title}">
//         </div>
//     `;
// }

// input.addEventListener("blur", function () {
//   OnChangeSearch(input.value);
// });

function OnChangeSearch(searchParam) {
  axios
    .get("https://www.omdbapi.com/?apikey=d684a20e&t=" + searchParam)
    .then(function (response) {
      if (response.data.Title) {
        movie = response.data;
      } else {
        movie.Title = "Tidak ada film...";
        movie.Poster = "uu";
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      const main = document.querySelector("#main");
      const card = document.createElement("div");
      const title = document.createElement("h1");
      const img = document.createElement("img");

      card.className = "card";
      title.innerText = movie.Title;
      img.setAttribute("src", movie.Poster);
      img.setAttribute("title", movie.Title);

      card.appendChild(title);
      card.appendChild(img);

      main.appendChild(card);
    });
}

function showCards(data) {
  return `
    <div class="card">
    <h1>${data.Title}</h1>
    <img src="${data.Poster}"
                title="${data.Title}">
    </div>
    `;
}
input.addEventListener("blur", function () {
  OnChangeSearch(input.value);
});
