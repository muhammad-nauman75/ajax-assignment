// // const apiKey = "49e7935c299fd0a499b27fef981062b8";
// // const url =
// //   "https://api.themoviedb.org/3/search/movie?api_key=49e7935c299fd0a499b27fef981062b8&query=Jack+Reacher";

// const input = document.querySelector(".input");
// // const type = document.querySelector("#movie-type");
// // const year = document.querySelector("#movie-years");

// const moviesContainer = document.querySelector(".movies-list");

// input.addEventListener("keyup", async function () {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=49e7935c299fd0a499b27fef981062b8&query=${input.value}`
//   );
//   const movies = await res.json();
// });

const input = document.querySelector(".input");
const type = document.querySelector("#movie-type");
const year = document.querySelector("#movie-years");

const moviesContainer = document.querySelector(".movies-list");
//console.log(input);
//http://www.omdbapi.com/?apikey=4dbd1e8b&i=tt1650062&plot=full
//&type=${type.value}&y=${year.value}

input.addEventListener("keyup", async function () {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=49e7935c299fd0a499b27fef981062b8&query=${input.value}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Something went wrong :(");

    const movies = await res.json();
    //console.log(movies);

    var moviesList = "";
    var movieYears = [];

    //Render Movies list
    const imgURL = "https://image.tmdb.org/t/p/w500";
    for (const movie of movies.results) {
      // console.log(movie);

      const moviesListHTML = `
      <div class="movie-box">
          <a onclick="movieInfo('${movie.id}')" class="title" href="#">${
        movie.original_title
      }</a>
          <a onclick="movieInfo('${
            movie.id
          }')" id="img-link" href="#"><img class="poster" src="${
        imgURL + movie.poster_path
      }" alt=""/></a>
          <p>${movie.release_date.slice(0, 4)}</p>
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

//request 2

const movieInfo = async function (id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=49e7935c299fd0a499b27fef981062b8&append_to_response=videos`
  );
  if (!res.ok) throw new Error("Something Went wrong");
  const info = await res.json();
  console.log(info);
  //tt3393786;
  const modalHTML = `
  <div id="overlay" class="hidden">
  <div id="modal">
    <div class="modal-window">
      <div class="modal-title">
        <h1 class="modal-movie-title">${info.original_title}(2011)</h1>
        <p class="desp">${info.tagline}</p>
        <p class="rating">
          <span class="title-span">imdb Rating:</span> 4.6
        </p>
      </div>

      <div class="modal-details">
        <p class="heading">Overview</p>
        <p>
          ${info.overview}
        </p>
        <iframe
          width="960px"
          height="600px"
          src=""
          frameborder="0"
        ></iframe>
      </di
    </div>
  </div>
</div>
`;
  document.querySelector(".movie-detail").innerHTML = modalHTML;
  document.querySelector(".movie-detail").classList.remove("hidden");
};
//movieInfo("tt1650062");
//https://www.youtube.com/embed/${info.videos.results[0].key}

document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.id === "overlay") {
    const content = target.parentElement;
    content.classList.add("hidden");
  }
});
const iframe = document.querySelector(".overview");
console.log(iframe);
