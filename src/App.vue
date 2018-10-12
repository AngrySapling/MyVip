<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  height: 100%;
}
*,h1,h2,h3,h4,h5,p,a{
  padding: 0;
  margin: 0;
}
html,body{
  font-size: 13.333333vw;
  margin: 0 auto;
  min-height: 100vh;
}
ul{
  list-style: none;
}
a{
    text-decoration: none;
}
</style>
