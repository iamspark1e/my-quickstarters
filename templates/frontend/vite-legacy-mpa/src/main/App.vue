<template>
  <div id="app">Vue App</div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}
*[safe-area-inset-bottom] {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
#app {
  font-family: PingFang SC, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  font-size: 0.2rem;
  min-height: 100vh;
  position: relative;
}
</style>
<style lang="sass">
</style>
