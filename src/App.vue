<template>
  <div id="app">
    <Home />
    <router-view /> <!-- This is where the routed components will be rendered -->
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';

</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import './assets/styles/main.css';
</style>
