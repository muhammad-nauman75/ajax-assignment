const input = document.querySelector(".input");
const type = document.querySelector("#movie-type");
const year = document.querySelector("#movie-years");
const moviesContainer = document.querySelector(".movies-list");
//console.log(input);
//http://www.omdbapi.com/?apikey=4dbd1e8b&i=tt1650062&plot=full
//&type=${type.value}&y=${year.value}

input.addEventListener("keyup", async function () {
  try {
    const url = `http://www.omdbapi.com/?apikey=4dbd1e8b&s=${input.value}&type=${type.value}&y=${year.value}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Something went wrong :(");

    const movies = await res.json();

    if (movies.Response === "False") throw new Error("No result found");

    var moviesList = "";
    var movieYears = [];

    //Render Movies list

    for (const movie of movies.Search) {
      //console.log(movie);
      const moviesListHTML = `
      <div class="movie-box">
          <a onclick="movieInfo('${movie.imdbID}')" class="title" href="#">${movie.Title}</a>
          <a onclick="movieInfo('${movie.imdbID}')" id="img-link" href="#"><img class="poster" src="${movie.Poster}" alt=""/></a>
          <p>${movie.Year}</p>
      </div>    
    `;
      moviesList += moviesListHTML;
      movieYears.push(movie.Year);
    }
    moviesContainer.innerHTML = moviesList;

    //Update Year option in dropdown list
    [...new Set(movieYears)].sort().forEach((uniqueYear) => {
      //In console the sort and set functions display result correctly but does not show the correct result in DOM Year List.....
      //console.log(uniqueYear);
      const yearslist = `
      <option class="movie-year" value="${uniqueYear}">${uniqueYear}</option>
      `;
      document.querySelector("#movie-years").innerHTML += yearslist;
    });

    const a = document.querySelectorAll(".title");
  } catch (err) {
    moviesContainer.innerHTML = `
    <h2>${err.message} for "${input.value}"</h2>
    `;
  }
});

// document.querySelector(".title").addEventListener("click", function () {
//   console.log("hello");
// });

const movieInfo = async function (id) {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=4dbd1e8b&i=${id}&plot=full`
    );
    if (!res.ok) throw new Error("Something Went wrong");
    const info = await res.json();
    //console.log(info);
    //tt3393786;
    const modalHTML = `
<div id="overlay" >
      <div id="modal" >
        <div class="close"></div>
        <div class="modal-window">
          <div class="modal-title">
            <h1 class="modal-movie-title">${info.Title} (${info.Year})</h1>
            <p class="desp">
              <span class="title-span">Type</span> ${info.Genre}
              <span class="title-span">Dur</span> ${info.Runtime}
            </p>
            <p class="rating">
              <span class="title-span">imdb Rating:</span> ${info.imdbRating}
            </p>
          </div>
          <div class="modal-movie-data">
            <div><img class="modal-img" src="${info.Poster}" alt="" /></div>
            <div class="modal-details">
              <p class="heading">
                Actors:
                <span class="detail-span"> ${info.Actors}</span>
              </p>
              <p class="heading">
                Country:
                <span class="detail-span"> ${info.Country}</span>
              </p>
              <p class="heading">
                Language:
                <span class="detail-span">${info.Language}</span>
              </p>
              <p class="heading">
                Released:
                <span class="detail-span"> ${info.Released}</span>
              </p>
              <p class="heading">
                Awards:
                <span class="detail-span"> ${info.Awards}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
    document.querySelector(".movie-detail").innerHTML = modalHTML;
    document.querySelector(".movie-detail").classList.remove("hidden");
  } catch (err) {
    moviesContainer.innerHTML = `<h2>${err.message}</h2>`;
  }
};
//movieInfo("tt1650062");

//Modal

document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.id === "overlay") {
    const content = target.parentElement;
    content.classList.add("hidden");
  }
});
