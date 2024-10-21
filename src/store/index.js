// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default createStore({
  state() {
    return {
      searchMovieResult: [],
      searchVisible: false,
      selectedMovie: null
    };
  },
  mutations: {
    SET_RESULTS(state, searchResult) {
        state.searchMovieResult = searchResult;
      },
      SET_SEARCHVISIBLE(state, isVisible){
        state.searchVisible = isVisible;
        console.log('Search visibility set to:', isVisible);
      },
      SET_SELECTED(state, movie){
        state.selectedMovie = movie;
        
      },
      SET_SELECTED(state, movie){
        state.selectedMovie = movie;
        
      }
  },
  actions: {
    async fetchSearchMovies({commit}, searchQuery){
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                  api_key: apiKey, // Replace with your actual API key
                  query: searchQuery.value,
                  language: 'en-US',
                  page: 1,
                  include_adult: false,
                },
              });
              commit('SET_RESULTS', response.data.results);
              commit('SET_SEARCHVISIBLE', true); // Show searchMovie component
              console.log('Search results fetched:', response.data.results);
          } catch (error) {
            console.error('Error fetching students:', error);
          }
    },
    async toggleSearchResultFalse({commit}){
        commit('SET_SEARCHVISIBLE', false);
    },
    async clickSelected({commit}, movie){
        commit('SET_SELECTED', movie);
    },
    async closeSelectedMovie({commit}){
        commit('SET_SELECTED', null);
    },
  },
  getters: {
    searchresultFinal: state => state.searchMovieResult,
    visibleSearch: state => state.searchVisible,
    selected: state => state.selectedMovie
  }
});
