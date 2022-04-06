<template>
  <div>
    <b-row class="mt-2 mb-3">
      <h6 class="text-secondary">
        Czy chcesz na pewno usunąć autora?
      </h6>
    </b-row>
    <b-row class="mt-2 mb-3">
      <p class="text-danger">
        To działanie jest nieodwracalne.
      </p>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="8">
         <b-alert :show="this.error" variant="danger"> Nie mozna usunąć autora! Autor posiada ksiązki </b-alert>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-button variant="danger" @click="deleteAuthor">
          Usuń autora
        </b-button>
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Zamknij</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    export default {
    name: "authors-delete",
    props: {
        id: Number,
    },
    data(){
      return {
        error: false,
      }
    },
    methods: {
        triggerClose() {
          this.$emit("closeDeleteModal")
          this.$router.push({name: 'authors'});
          },
          async deleteAuthor() {
          fetch('http://localhost:8080/delete/author/' + this.$route.params.id, {
          method: 'DELETE',
          headers: {
                  'Content-Type': 'text/plain;charset=UTF-8'
              },
          })
          .then(res => {
            if(res.status == 200) {
              this.$router.push({name: 'authors'},res)
            } else{
              this.error = true
            }
            } )  
        },
    },
};
</script>