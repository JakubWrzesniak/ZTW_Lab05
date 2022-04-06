<template>
    <div id = "books-table">
        <table>
            <thead>
                <th>Id</th>
                <th>Tytuł</th>
                <th>Autor</th>
                <th>Liczba stron</th>
            </thead>
            <tbody>
                <tr v-for="book in booksSource" :key = "book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>
                        <span v-if="book.author != null">
                            <router-link :to="'/author/' + book.author.id" >{{ book.author.name }} {{ book.author.surname}}</router-link>
                        </span>
                    </td>
                    <td>{{ book.pages}}</td>
                    <td><b-button variant="link" @click="$router.push({name: 'deletebook', params: {id: book.id },})">Usuń książkę</b-button></td>
                </tr>
            </tbody>
        </table>
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
