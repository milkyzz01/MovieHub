<!-- ParentComponent.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold movie-title" href="#">Movie<span class="hub-extension">Hub</span></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">

        <!-- Search bar section -->
        <form class="d-flex ms-auto" @submit.prevent="handleSearch">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search for movies"
            aria-label="Search"
            v-model="searchQuery"
          />
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

 
</template>

<script setup>
import { ref, provide, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();
const searchQuery = ref('');



const handleSearch = async () => {
  if (searchQuery.value) {
    try {
     await store.dispatch('fetchSearchMovies', searchQuery);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }
};


</script>

<style scoped>
.form-control {
  width: 250px; /* Adjust to a smaller but reasonable width */
  padding: 8px; /* Adjust padding for a better fit */
  font-size: 0.875rem; /* Adjust font size to match the new width */
  height: 30px;
}

.btn-outline-light {
  margin-left: 8px; /* Adjust margin for better spacing */
  font-size: 0.875rem; /* Adjust font size for better fit */
  padding: 6px 12px; /* Adjust padding to match the input field size */
}


</style>
