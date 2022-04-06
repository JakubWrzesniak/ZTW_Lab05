<template>
    <nav id = "nav">
        <router-link to="/">Books</router-link> |
        <router-link to="/authors">Authors</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
</template>

<script>
    export default {
        name: "AppLayoutLinks"
    }
</script>

<style scoped>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #8f5dcf;
}
</style>
