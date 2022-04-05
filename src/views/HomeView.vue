<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <books-table :booksSource="books"  msg="Welcome to Your Vue.js App"/>
    <div id="app" class="small-container">
      <h1>Dodaj książkę</h1>
      <books-form @add:book="getBooks"/>
 </div>

  </div>
</template>

<script>
// @ is an alias to /src
import BooksTable from '@/components/BooksTable.vue'
import BooksForm from '@/components/BooksForm.vue'

export default {
  name: 'HomeView',
  components: {
    BooksTable,
    BooksForm
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

    addBook(book){
      this.books = [...this.books, book]
    }
  },
  mounted(){
    this.getBooks()
  },
  handleSubmit() {
    this.$emit('add:book', this.books)
 }, 
}
</script>
