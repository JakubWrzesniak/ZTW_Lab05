<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <books-table :booksSource="books"  msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BooksTable from '@/components/BooksTable.vue'

export default {
  name: 'HomeView',
  components: {
    BooksTable
  },
  data(){
    return {
      books: [],
    }
  },
  methods: {
    async getBooks(){
      try{
        const response = await fetch("http://localhost:8080/get/books")
        const data = await response.json()
        this.books = data
        console.log(this.books)
      } catch(error){
        console.error(error)
      }
    },
  },
  mounted(){
    this.getBooks()
  }
}
</script>
