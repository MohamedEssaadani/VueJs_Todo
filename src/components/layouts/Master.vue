<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">
        <img
          alt="Vue logo"
          src="../../assets/images/todoPic.png"
          style="height:45px; width:60px; margin-left:40px;"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/todos">Todos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item mr-auto">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item mr-auto">
            <router-link class="nav-link" style="margin-right:40px;" to="/signin">Sign In</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 20px;
  height: 100vh;
}
</style>