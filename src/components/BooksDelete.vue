<template>
  <div>
    <b-row class="mt-2 mb-3">
      <h6 class="text-secondary">
        Czy chcesz na pewno usunąć książkę?
      </h6>
    </b-row>
    <b-row class="mt-2 mb-3">
      <p class="text-danger">
        To działanie jest nieodwracalne.
      </p>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-button variant="danger" @click="deleteBook"
          >Usuń książkę</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Zamknij</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    export default {
    name: "books-delete",
    props: {
        id: Number,
    },
    methods: {
        triggerClose() {
        this.$emit("closeDeleteModal")
        this.$router.push({name: 'home'});
        },
        async deleteBook() {
        fetch('http://localhost:8080/delete/book/' + this.$route.params.id, {
        method: 'DELETE',
        headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            },
        })
        .then(res => console.log(res))
        .then(res => this.$router.push({name: 'home'},res))  
        },
    },
};
</script>