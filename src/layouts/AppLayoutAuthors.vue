<template>
  <div>
    <header class="header" />
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppLayoutAuthors",
}
</script>

<style scoped>
.header {
  height: 5rem;
  background-color: blue;
}
</style>