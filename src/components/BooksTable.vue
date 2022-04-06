<template>
    <div id = "books-table">
        <b-table-simple stripped hover>
            <b-thead>
                <b-th>Id</b-th>
                <b-th>Tytuł</b-th>
                <b-th>Autor</b-th>
                <b-th>Liczba stron</b-th>
                <b-th>Akcja</b-th>
            </b-thead>
            <b-tbody>
                <b-tr v-for="book in booksSource" :key = "book.id">
                    <b-td>{{ book.id }}</b-td>
                    <b-td>{{ book.title }}</b-td>
                    <b-td>
                        <span v-if="book.author != null">
                            <router-link :to="'/author/' + book.author.id" >{{ book.author.name }} {{ book.author.surname}}</router-link>
                        </span>
                    </b-td>
                    <b-td>{{ book.pages}}</b-td>
                    <b-td>
                        <b-button variant="link" @click="$router.push({name: 'book-details', params: {id: book.id },})">Szczegóły</b-button> | 
                        <b-button variant="link" @click="$router.push({name: 'deletebook', params: {id: book.id },})">Usuń książkę</b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>

export default {
    name: 'books-table',
    props: {
        booksSource: Array,
    }
}
</script>

<style scoped>
th {
  text-align: left;
}

#books-table {
    justify-content: center;
}

.btn-link:hover {
    color:white;
}
</style>
