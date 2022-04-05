<template>
  <div id="app" class="small-container">
    <h1>Ksiązki</h1>
    <books-table :booksSource="books"/>
 </div>
</template>

<script>
import BooksTable from './components/BooksTable.vue'

export default {
  name: 'App',
  components: {
    BooksTable,
  },
  data(){
    return{
      books: null
    }
  },
  methods: {
    async getBooks(){
      try{
        const responce = await fetch('http://localhost:8080/get/books')
        const data = await responce.json()
        this.books = data
        
      }
      catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getBooks()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
