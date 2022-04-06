<template>
  <div class="auhtors" id="container">
      <div>
        <b-button v-b-toggle.collapse-1 variant="info" class="m-3">Dodaj autora</b-button>
        <b-collapse id="collapse-1" class="mt-2">
            <div id="app" class="small-container">
                <b-card>
                    <h1>Dodaj autora</h1>
                    <authors-form @add:author="getAuthors"/>
                </b-card>
             </div>
        </b-collapse>
        </div>
    <authors-list :authorsSource="authors"/>
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
