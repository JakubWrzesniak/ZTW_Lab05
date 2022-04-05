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
                <td><router-link to="/authors">{{ book.author.name }} {{ book.author.surname}}</router-link></td>
                <td>{{ book.pages}}</td>
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
