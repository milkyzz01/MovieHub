<template>
    <div class="container mt-4" v-if="searchVisible">
    <div class="custom-header">
    <h5 class="fw-bold">Search Results</h5>
    <button class="close-button" @click="closeSearch">
         &times; <!-- This is a simple text-based close icon, or you can use an SVG or font icon -->
    </button>
    </div>
    <div class="row">
      <div v-if="searchResults.length === 0" class="text-center">
        <p>No results found</p>
      </div>

      <div v-for="(movie, index) in searchResults" :key="index" class="col-md-3" @click="selectMovie(movie)">
        <div class="card">
          <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
            class="card-img-top"
            :alt="movie.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.release_date ? movie.release_date.split('-')[0] : 'Unknown' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { inject } from 'vue';
import { useStore } from 'vuex';

const store = useStore();


const searchResults = computed(() => store.getters.searchresultFinal);
const searchVisible = computed(() => store.getters.visibleSearch);

const closeSearch = () =>{
    store.dispatch('toggleSearchResultFalse');
};

const selectMovie = (movie) => {
    store.dispatch('clickSelected', movie)
};



</script>

<style scoped>
h5{
    cursor: pointer;
}

.container {
  margin-top: 20px;
}

.card {
  max-height: 500px;
  height: 100%;
  margin-bottom: 50px;
  background-color: rgb(36, 44, 44);
  padding: 10px;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

.card-body{
    margin-bottom: 10%;
    color: #fff;
    
}

.close-button {
  position: relative;
  top: 0px; /* Adjust based on your preference */
  right: 0px; /* Adjust based on your preference */
  background: transparent;
  border: none;
  font-size: 2.5rem; /* Adjust size as needed */
  color: #fff; /* Adjust color as needed */
  cursor: pointer;
  z-index: 10; /* Ensure it appears above other content */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Subtle shadow for better readability */
  transition: 0.5s;
}

.close-button:hover {
  color: #e50914; /* Example hover color */
}

.custom-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

@media (max-width: 480px) {
  .card {
    max-height: none;
    height: auto;
  }
}

@media (max-width: 768px) {
  .card {
    max-height: 400px;
    height: 100%;
  }
}


</style>