<template>
  <div class="auhtors" id="container">
    <authors-list :authorsSource="authors"/>
    <div id="app" class="small-container">
      <h1>Dodaj autora</h1>
      <authors-form @add:author="getAuthors"/>
 </div>
  </div>
</template>

<script>
import AuthorsList from '@/components/AuthorsList.vue'
import AuthorsForm from '@/components/AuthorsForm.vue'

export default {
    name: "AuthorsView",
    components: {
        AuthorsList,
        AuthorsForm
    },
    data(){
        return {
            authors: []
        }
    },
    methods: {
        async getAuthors(){
            try{
               const responce = await fetch("http://localhost:8080/get/authors")
               const data = await responce.json()
               this.authors = data
               console.log(this.authors)
            } catch(error){
                console.error(error)
            }
        }
    },
    mounted(){
        this.getAuthors();
    },
    handleSubmit() {
    this.$emit('add:author', this.authors)
 },

}
</script>

<style scoped>
#container {
    justify-content: center;
}
</style>
