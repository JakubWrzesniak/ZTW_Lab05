<template>
  <div class="auhtors">
    <authors-list :authorsSource="authors"/>
  </div>
</template>

<script>
import AuthorsList from '@/components/AuthorsList.vue'

export default {
    name: "AuthorsView",
    components: {
        AuthorsList
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
    }

}
</script>
