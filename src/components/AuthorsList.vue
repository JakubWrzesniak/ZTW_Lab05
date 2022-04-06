<template>
    <div id=autors-list>
        <b-table-simple stripped hover :items="authors">
            <b-thead>
                <b-th>Id</b-th>
                <b-th>Imię</b-th>
                <b-th>Nazwisko</b-th>
                <b-th>Akcja</b-th>
            </b-thead>
            <b-tbody>
            <tr v-for="author in authorsSource" :key = "author.id">
                <b-td>{{ author.id }}</b-td>
                <b-td>{{ author.name }}</b-td>
                <b-td>{{ author.surname }} </b-td>
                <td>
                    <b-button variant="link" @click="$router.push({name: 'author-details', params: {id: author.id },})">Szczegóły</b-button> | 
                    <b-button variant="link" @click="$router.push({name: 'deleteauthor', params: {id: author.id },})">Usuń autora</b-button>
                </td>
            </tr>
        </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>

export default {
    name: 'authors-list',
    props: {
        authorsSource: Array,
    }
}
</script>

<style scoped>
th {
    text-align: left;
}
#authors-list {
    justify-content: center;
}
.btn-link:hover {
    color:white;
}
</style>