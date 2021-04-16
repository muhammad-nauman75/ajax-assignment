/**
 * 
 * //api key = 49e7935c299fd0a499b27fef981062b8
// example https://api.themoviedb.org/3/movie/550?api_key=49e7935c299fd0a499b27fef981062b8

// THe movie Database
 * const tmdb = async function () {
  const res = await fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=49e7935c299fd0a499b27fef981062b8&query=spiderman"
  );
  const data = await res.json();
  console.log(data);
};
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */

/**
 * According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
 * 1 Required parameter: apikey
 * 2 Required parameter: One of the following i=, t= or s=
 *
 *
 * Example with parameter s=star trek
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
 *
 * Example with parameter s=star trek AND y=2020
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
 *
 * Example with parameter s=star trek AND type=series
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=series
 *
 */

//URL with my api key
//http://www.omdbapi.com/?apikey=4dbd1e8b&
// const movieData = async function () {
//   const res = await fetch("http://www.omdbapi.com/?apikey=4dbd1e8b&s=superman");
//   const data = await res.json();
//   console.log(data);
// };
// movieData();

const input = document.querySelector(".input");
//console.log(input);

input.addEventListener("keyup", async function () {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=4dbd1e8b&s=${input.value}`
    );
    if (!res.ok) throw new Error("Something went wrong :(");
    const data = await res.json();
    //console.log(data.Error);
    if (data.Error) throw new Error("0 result found");
    //console.log(data);
    const suggBox = document.querySelector(".sugg-movie");
    var suggMovie = "";
    var movieYear = [];
    var movieYearInput = "";
    for (const single of data.Search) {
      suggMovie += `
           <p class="sugg-movie">${single.Title}</p>
    `;
      movieYear.push(single.Year);

      // movieYearInput += `
      //     <option class="movie-year" value="${single.Year}">${single.Year}</option>
      // `;
      // document.querySelector("#movie-year").innerHTML = movieYearInput;

      //console.log(single.Year);
      // console.log(single);
    }
    const uniqueYears = [...new Set(movieYear)].sort().forEach((uniqueYear) => {
      console.log(uniqueYear);
      //document.querySelector("#movie-year").innerHTML += uniqueYears;
      const yearslist = `
      <option class="movie-year" value="${uniqueYears}">${uniqueYear}</option>
      `;
      document.querySelector("#movie-year").innerHTML += yearslist;
    });

    console.log(movieYear);
    console.log(uniqueYears);

    document.querySelector(".sugg-movie").innerHTML = suggMovie;
  } catch {
    (err) => console.log(err);
  }
});
const yearsList = document.querySelector("#movie-years");
const yearList = document.querySelector(".movie-year");
console.log(yearList);
