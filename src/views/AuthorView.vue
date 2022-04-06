<template>
  <div class="auhtor">
    <author-details  @edit:author="updateAuthor" :authorSource="author"/>
  </div>
</template>

<script>
import AuthorDetails from '../components/AuthorDetails.vue'

export default {
  name: "AuthorView",
  components: {
    AuthorDetails
  },
  data(){
        return {
            author: null,
        }
  },
  methods:{
    getAuthor(id){
        fetch("http://127.0.0.1:8080/get/author/" + id)
        .then(res => res.json())
        .then(res => this.author = res)
        .catch(error => console.log(error))
    },
    updateAuthor(author){
      this.author = author;
    }
  },
  mounted() {
    this.getAuthor(this.$route.params.id)
  }
}
</script>
