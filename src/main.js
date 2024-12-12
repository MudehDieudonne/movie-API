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
    console.log(data);

    const sec01 = document.getElementById('movie01');

    // Make sure 'results' exists and is an array
    if (Array.isArray(data.results)) {
      data.results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image+Available';

        const image = document.createElement('img');
        image.src = posterPath;
        image.alt = movie.title || 'Movie Title';
        image.className = 'movie-img';
        movieCard.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = movie.title || 'Unknown Title';
        title.className = 'movie-title';
        movieCard.appendChild(title);

        const rating = document.createElement('p');
        rating.innerHTML = `&#11088; ${movie.vote_average || 'N/A'}`;
        rating.className = 'movie-rating';
        movieCard.appendChild(rating);

        sec01.appendChild(movieCard);
      });
    } else {
      console.error('No movies found in the response.');
    }
  })
  .catch((err) => console.error('Error fetching movies:', err));
