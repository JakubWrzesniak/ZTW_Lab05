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
}
th {
  text-align: left !important;
}
</style>