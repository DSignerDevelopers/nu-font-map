<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import fontListJSON from '../src/assets/fontList.json';

export default {
  name: 'App',
  methods: {
    addGoogleFontCSS() {
      fontListJSON.forEach((font) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `https://fonts.googleapis.com/css?family=${font}`;

        document.getElementsByTagName('head')[0].appendChild(link);
      });
    },
  },
  mounted() {
    this.addGoogleFontCSS();
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  min-height: 100vh;
}

body, html {
  margin: 0;
  min-height: 100vh;
}

</style>
