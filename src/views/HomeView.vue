<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <books-table msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BooksTable from '@/components/BooksTable.vue'

export default {
  name: 'HomeView',
  components: {
    BooksTable
  }
}
</script>
