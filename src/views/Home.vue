<template>
  <div>
    <Navbar />
    
    <div v-if="selectedMovie" class="movie-details">
       <button class="close-button" @click="closeSelectedMovie">
         &times; <!-- This is a simple text-based close icon, or you can use an SVG or font icon -->
       </button>
      <div class="movie-background" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})` }"></div>
      <div class="movie-info">
         <h1>{{ selectedMovie.title }}</h1>
         <p>{{ selectedMovie.overview }}</p>
         <button class="play-button">Play</button>
    </div>
    </div>

    <!--section of search movies-->
    <searchMovie />

    <div class="container mt-5 movie-contain" v-if="!StateOfSearch">
      <!-- Popular Movies section -->
      <h5 class="fw-bold popular-title">Popular Movies</h5>
      <div class="my-swiper">
        <swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :breakpoints="{
            320: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4.5 },
            1024: { slidesPerView: 5.3 }
          }"
          :space-between="15"
          :navigation="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :loop="true"
        >
          <swiper-slide v-for="(movie, index) in movies" :key="index" @click="selectMovie(movie)">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.title"
              class="img-fluid popular-img"
            />
          </swiper-slide>
        </swiper>
      </div>

      <!-- Top Rated Movies section -->
      <h5 class="fw-bold popular-title mt-5">Top Rated Movies</h5>
      <div class="my-swiper">
        <swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :breakpoints="{
            320: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4.5 },
            1024: { slidesPerView: 5.3 }
          }"
          :space-between="15"
          :navigation="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :loop="true"
        >
          <swiper-slide v-for="(movie, index) in topRated" :key="index" @click="selectMovie(movie)">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.title"
              class="img-fluid popular-img"
            />
          </swiper-slide>
        </swiper>
      </div>

        <!-- Upcoming Movies section -->
      <h5 class="fw-bold popular-title mt-5">Upcoming Movies</h5>
      <div class="my-swiper">
        <swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :breakpoints="{
            320: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4.5 },
            1024: { slidesPerView: 5.3 }
          }"
          :space-between="15"
          :navigation="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :loop="true"
        >
          <swiper-slide v-for="(movie, index) in upcomingMovies" :key="index" @click="selectMovie(movie)">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.title"
              class="img-fluid popular-img"
            />
          </swiper-slide>
        </swiper>
      </div>

      <!--end -->
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper'; // Ensure Autoplay is imported
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import searchMovie from '../components/searchResult.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const StateOfSearch = computed(() => store.getters.visibleSearch);

const movies = ref([]);
const topRated = ref([]);
const selectedMovie = computed(() => store.getters.selected);
const upcomingMovies = ref([]);
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const selectMovie = (movie) => {
  store.dispatch('clickSelected', movie)
};

const closeSelectedMovie = () =>{
  store.dispatch('closeSelectedMovie')
};

onMounted(async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  movies.value = response.data.results;
  const TopRatedResponse = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
  topRated.value = TopRatedResponse.data.results;
  const upcomingResponse = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
  upcomingMovies.value = upcomingResponse.data.results;
});
</script>

<style scoped>
.my-swiper {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.popular-title {
  font-size: 1.5rem; /* Large font size for prominence */
  font-weight: bold; /* Bold text for emphasis */
  letter-spacing: 2px; /* Spacing between letters */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Subtle shadow for better readability */
}

.popular-img {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition effect */
}

.swiper-slide img:hover {
  transform: translateY(-10px); /* Move image up by 10px on hover */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.swiper-slide img {
  width: 100%;
  height: auto;
}

.swiper-slide h5 {
  margin-top: 10px;
  text-align: center;
}

/* Ensure buttons are visible */
.swiper-button-next,
.swiper-button-prev {
  color: #fff; /* Adjust this to your desired color */
}

/* Movie Details Section */

.movie-details {
  position: relative;
  width: 100%;
  height: 90vh; /* Adjust based on your preference */
  color: #fff;
  background-size: cover;
  background-position: center;
  padding: 40px; /* Increase padding for more space */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden; /* Ensure the gradient does not overflow */
}

.movie-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.4; /* Slightly higher opacity */
  z-index: -1;
}

.movie-info {
  position: absolute;
  top: 20%;
  bottom: 20%; /* Position from the bottom */
  left: 50px; /* Position from the left */
  width: 100%; /* Adjust width as needed */
  max-width: 600px; /* Set a maximum width */
  z-index: 1;
  color: #fff;
  
}

.movie-info h1 {
  font-size: 3rem; /* Larger font size for prominence */
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Enhance text readability */
}

.movie-info p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 80%; /* Limit width to avoid full span */
}

.play-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background: #e50914; /* Netflix red color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.play-button:hover {
  background: #f40612; /* Darker red for hover */
}

/* Gradient Fade Effect */
.movie-details::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%; /* Adjust based on your preference */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
  z-index: 2;
}

.movie-info h1 {
  font-size: 3rem; /* Default larger font size for bigger screens */
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Enhance text readability */
}

.movie-info p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 80%; /* Limit width to avoid full span */
}

.play-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background: #e50914; /* Netflix red color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.play-button:hover {
  background: #f40612; /* Darker red for hover */
}

/* Adjust font size for smaller screens */
@media (max-width: 1024px) {
  .movie-info h1 {
    font-size: 2.5rem;
  }
  .movie-info p {
    font-size: 1.1rem;
  }
  .play-button {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .movie-info h1 {
    font-size: 2rem;
  }
  .movie-info p {
    font-size: 1rem;
  }
  .play-button {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .movie-info h1 {
    font-size: 1.5rem;
  }
  .movie-info p {
    font-size: 0.9rem;
  }
  .play-button {
    font-size: 0.9rem;
  }
}

.close-button {
  position: absolute;
  top: 10px; /* Adjust based on your preference */
  right: 40px; /* Adjust based on your preference */
  background: transparent;
  border: none;
  font-size: 3rem; /* Adjust size as needed */
  color: #fff; /* Adjust color as needed */
  cursor: pointer;
  z-index: 10; /* Ensure it appears above other content */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Subtle shadow for better readability */
  transition: 0.5s;
}

.close-button:hover {
  color: #e50914; /* Example hover color */
}
</style>
