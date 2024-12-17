let slideIndex = 0;
const slides = document.querySelectorAll(".slider");
const dots = document.querySelectorAll(".dot");

// Show the active slide
function showSlides(index) {
  // Reset all slides and dots
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Adjust slide index if it's out of bounds
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  // Set the active slide and dot
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Navigate to the next slide automatically after 5 seconds
function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
  setTimeout(autoSlide, 5000);
}

// Navigate to a specific slide when a dot is clicked
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slideIndex = i;
    showSlides(slideIndex);
  });
});

// Initialize the slider
showSlides(slideIndex);
setTimeout(autoSlide, 7000);

//MDB
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWIxMTlmNDUxOWIzYzQ4MTg5ZmQxMDM5YWVhOGZlZCIsIm5iZiI6MTczMzg5NTU2NS45Miwic3ViIjoiNjc1OTI1OGRkNWNmYTljODdkODkwMzdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.sM6opl36s-j-fSrPdz4Iy0tThtl0yUoKjGBKHfXs-2w'
  }
};

fetch(API_URL, options)
  .then(res => res.json())
  .then((data) => {
    console.log(data)

    const sec01 = document.getElementById('movie01')

    // Make sure 'results' exists and is an array
    if (Array.isArray(data.results)) {
      data.results.forEach(movie => {
        const movieCard = document.createElement('div')
        movieCard.className = 'movie-card'

        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image+Available'

        const image = document.createElement('img')
        image.src = posterPath
        image.alt = movie.title || 'Movie Title'
        image.className = 'movie-img'
        movieCard.appendChild(image)

        const title = document.createElement('h3')
        title.textContent = movie.title || 'Unknown Title'
        title.className = 'movie-title'
        movieCard.appendChild(title)

        const rating = document.createElement('p');
        rating.innerHTML = `&#11088; ${movie.vote_average || 'N/A'}`
        rating.className = 'movie-rating'
        movieCard.appendChild(rating)

        sec01.appendChild(movieCard)
      })
    } else {
      console.error('No movies found in the response.')
    }
  })
  .catch((err) => console.error('Error fetching movies:', err))


  //Watch list 
const watchListOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWIxMTlmNDUxOWIzYzQ4MTg5ZmQxMDM5YWVhOGZlZCIsIm5iZiI6MTczMzg5NTU2NS45Miwic3ViIjoiNjc1OTI1OGRkNWNmYTljODdkODkwMzdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.sM6opl36s-j-fSrPdz4Iy0tThtl0yUoKjGBKHfXs-2w'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', watchListOptions)
  .then(res => res.json())
  .then((data) => {
    console.log('data', data)

    const sec02 = document.getElementById('movie02')
  
  if (Array.isArray(data.results)) {  // Check if results exist and is an array
      const movieSlider = document.querySelector('.movieslider')

      data.results.forEach((movie) => {  // Use 'results' not 'result'
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie-card')

        const movieImage = document.createElement('img')
        movieImage.src = movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image+Available'
        movieImage.alt = movie.title || 'Movie Title'

        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie-info')

        const movieTitle = document.createElement('h3')
        movieTitle.textContent = movie.title || 'Untitled'

        const movieOverview = document.createElement('p')
        movieOverview.textContent = movie.overview || 'No overview available'

        movieInfo.appendChild(movieTitle)
        movieInfo.appendChild(movieOverview)

        movieCard.appendChild(movieImage)
        movieCard.appendChild(movieInfo)

        sec02.appendChild(movieCard)
      })
    } else {
      console.error('No movies found in the response.')
    }
  })
  .catch((err) => console.error('Error fetching movies:', err))

//likes
const likes = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWIxMTlmNDUxOWIzYzQ4MTg5ZmQxMDM5YWVhOGZlZCIsIm5iZiI6MTczMzg5NTU2NS45Miwic3ViIjoiNjc1OTI1OGRkNWNmYTljODdkODkwMzdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.sM6opl36s-j-fSrPdz4Iy0tThtl0yUoKjGBKHfXs-2w'
  }
};

fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', likes)
  .then(res => res.json())
  .then((data) => {
    console.log(data)

    const sec03 = document.getElementById('movie03');

    if (Array.isArray(data.results)) {
      data.results.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card03';
    
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image+Available';
    
        const image = document.createElement('img');
        image.src = posterPath;
        image.alt = movie.title || 'Movie Title';
        image.className = 'movie-img03';
        movieCard.appendChild(image);
    
        const title = document.createElement('h3');
        title.textContent = movie.title || 'Unknown Title';
        title.className = 'movie-title03';
        movieCard.appendChild(title);
    
        const rating = document.createElement('p');
        rating.innerHTML = `&#11088; ${movie.vote_average || 'N/A'}`;
        rating.className = 'movie-rating03';
        movieCard.appendChild(rating);
    
        sec03.appendChild(movieCard);
      });
    } else {
      console.error('No movies found in the response.');
    }
    })
    .catch((err) => console.error('Error fetching movies:', err))

    //making it a slider

const sec03 = document.getElementById('movie03')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

let currentIndex = 0
const cardWidth = 700

function updateCardWidth() {
  const firstCard = document.querySelector('.movie-card');
  if (firstCard) {
    cardWidth = firstCard.offsetWidth + 20; // Add the gap (20px)
  }
}

function updateSlider() {
  sec03.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

window.addEventListener('resize', () => {
  updateCardWidth();
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener('click', () => {
  const totalCards = document.querySelectorAll('.movie-card').length;
  const maxIndex = totalCards - Math.floor(sec03.offsetWidth / cardWidth);
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});