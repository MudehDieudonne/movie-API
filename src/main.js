const heroContainer = document.querySelector(".slider-container");
const popsctn = document.querySelector('.pop-cards');
const justRelease = document.querySelector('.just-releas');


// fetchx slider images
const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=eab119f4519b3c48189fd1039aea8fed&language=en-US&query="';
const main = document.getElementById('main');

const form = document.getElementById('form');
const search = document.getElementById('search');

// Handling the form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchWord = search.value;

  if (searchWord && searchWord !== '') {
    getMovies(SEARCH_API + searchWord);
    search.value = '';
  } else {
    window.location.reload();
  }
});

// get initial movies
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWIxMTlmNDUxOWIzYzQ4MTg5ZmQxMDM5YWVhOGZlZCIsIm5iZiI6MTczMzg5NTU2NS45Miwic3ViIjoiNjc1OTI1OGRkNWNmYTljODdkODkwMzdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.sM6opl36s-j-fSrPdz4Iy0tThtl0yUoKjGBKHfXs-2w'
  }
};

fetch(API_URL, options)
  .then(res => res.json())
  .then(data => {
    createHeroElement(data);

    // Wait for the DOM to update with new sliders
    const slider = document.querySelectorAll('.slider');
    if (slider.length > 0) {
      slideShow(slider); // Call slideShow only if sliders exist
    } else {
      console.error("No sliders found. Make sure the createHeroElement function is working correctly.");
    }
  })
  .catch(err => console.error(err));


// Create a hero element
function createHeroElement(movies) {
  heroContainer.innerHTML = '';

  movies.results.forEach((movie) => {
    const { title, poster_path, release_date, overview, original_title } = movie;

    const heroEl = document.createElement("div");
    heroEl.classList.add('slider');
    heroEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-details">
        <a href="#">
          ${original_title}
        </a>
        <h2>${title}</h2>
        <p class="date">${release_date}; Action</p>
        <p>
          ${overview}
        </p>
        <div class="action-buttons">
          <button>Play Now</button>
          <button>Watch Trailer</button>
          <button>Add Watchlist</button>
        </div>
      </div>
    `;
    heroContainer.appendChild(heroEl);
  });
}

// Hero Slider
function slideShow(slides) {
  let currentSlide = 0;

  function updateSlides() {
    slides?.forEach((slide) => slide.classList?.remove('active'));
    slides[currentSlide]?.classList.add('active');
    currentSlide = (currentSlide + 1) % slides.length;

    setTimeout(() => updateSlides(), 5000);
  }

  updateSlides();
}

// POP Section
const API_URL_POP = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eab119f4519b3c48189fd1039aea8fed&page=1';

getMovies(API_URL_POP);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showPopMovies(data.results);
}

function showPopMovies(movies) {
  let popCount = 0;
  popsctn.innerHTML = '';

  movies.forEach((movie) => {
    popCount++;
    const { title, poster_path, release_date, vote_average, overview, vote_count, adult } = movie;

    const popEl = document.createElement("div");
    popEl.classList.add('pop-card');

    popEl.innerHTML = `
      <div class="pop-num">
        <h2>${popCount}</h2>
      </div>
      <div class="pop-img">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
      </div>
      <div class="card-content">
        <h3 class="card-title">${title}</h3>
        <div class="card-genre">${vote_count} • ${release_date}</div>
        <div class="rating">
          <span class="${displayClassByRate(vote_average)}">&#9733; ${vote_average}</span> <span>| Adult: ${adult}</span>
        </div>
      </div>
    `;
    popsctn.appendChild(popEl);
  });
}

function displayClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 4) {
    return 'orange'
  } else {
    return 'red'
  }
}

// just release section

const API_URL_JUST_RELEASE = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=eab119f4519b3c48189fd1039aea8fed&page=1';

justReleaseMovies(API_URL_JUST_RELEASE)

async function justReleaseMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  showJustReleaseMovies(data.results)
}


const justReleaseEl = document.querySelector('.cards')

function showJustReleaseMovies(movies) {

  justReleaseEl.innerHTML = ''

  movies.forEach((movie) => {
    const {title, poster_path, vote_average, release_date,adult} = movie

    const releaseCard = document.createElement('div')
    releaseCard.classList.add('releas')
    releaseCard.classList.add('card')
    releaseCard.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="releas-det">
        <h4>${title}</h4>
        <div class="releas-rating">${vote_average}</div>
        <div class="like-icon"> &#9829</div>
      </div>
    `
    justReleaseEl.appendChild(releaseCard)
  })
}

// Your watch list section

const WAT_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eab119f4519b3c48189fd1039aea8fed&page=1'
watchSectn(WAT_URL)
async function watchSectn(url){
  const res = await fetch(url)
  const data = await res.json()
  displayWatchList(data.results)

}


const watchList = document.querySelector('.watchlist')

function displayWatchList (moves) {
  watchList.innerHTML = ''

  moves.forEach((move) => {
    const {title, poster_path, vote_average, release_date} = move

    const movieCard = document.createElement('div');
    movieCard.classList.add('watch-card');
    movieCard.classList.add('card')
    movieCard.innerHTML = `
      <div class="card-img">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
      </div>
      <div class="card-details">
        <h4>${title}</h4>
        <p>Rating: <span class="${displayClassByRate(vote_average)}">${vote_average}</span></p>
        <p>Release Date: <span class="release-date">${release_date}</span></p>
      </div>
    `
    watchList.appendChild(movieCard)
  })
}


function handleCardClick(movie) {
  // Store the movie data in localStorage
  localStorage.setItem('selectedMovie', JSON.stringify(movie));

  // Redirect to the detail page
  window.location.href = 'detail.html'; // Ensure this file exists
}



