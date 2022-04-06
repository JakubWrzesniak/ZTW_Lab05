<template>
  <div class="book">
    <book-details  @update:book="updateBook" :bookSource="book"/>
  </div>
</template>

<script>
import BookDetails from '../components/BookDetails.vue'

export default {
  name: "BookView",
  components: {
    BookDetails
  },
  data(){
        return {
            book: null,
        }
  },
  methods:{
    getBook(id){
        fetch("http://127.0.0.1:8080/get/book/" + id)
        .then(res => res.json())
        .then(res => this.book = res)
        .catch(error => console.log(error))
        console.log("Getting Book")
        console.log(this.book)
    },
    updateBook(id){
      this.getBook(id);
    }
  },
  mounted() {
    this.getBook(this.$route.params.id)
  }
}
</script>
