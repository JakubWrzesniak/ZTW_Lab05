<template>
  <div class="home">
    <div id="app" class="small-container">
          <div>
            <b-button v-b-toggle.collapse-1 variant="info" class="m-5">Dodaj ksiązkę</b-button>
            <b-collapse id="collapse-1" class="mt-2 mb-5">
                <b-card>
                    <h1>Dodaj książkę</h1>
                    <books-form @add:book="getBooks" :authorsSource="authors"/>
                </b-card>
            </b-collapse>
          </div>
    </div>
    <books-table :booksSource="books" />
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
      authors: [],
    }
  },
  methods: {
    async getBooks(){
      try{
        const response = await fetch("http://localhost:8080/get/books")
        const data = await response.json()
        this.books = data
      } catch(error){
        console.error(error)
      }
    },
    getAuthors(){
        fetch("http://localhost:8080/get/authors")
        .then(res => res.json())
        .then(res => this.authors = res)
        .catch(error => console.log(error))
    },
    addBook(book){
      this.books = [...this.books, book]
    }
  },
  mounted(){
    this.getBooks()
    this.getAuthors()
  },
  handleSubmit() {
    this.$emit('add:book', this.books)
 }, 
}
</script>
