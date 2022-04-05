<template>
    <div id=autors-list>
        <table>
            <thead>
                <th>Id</th>
                <th>Imię</th>
                <th>Nazwisko</th>
            </thead>
            <tbody>
            <tr v-for="author in authorsSource" :key = "author.id">
                <td>{{ author.id }}</td>
                <td>{{ author.name }}</td>
                <td>{{ author.surname }} </td>
            </tr>
        </tbody>
        </table>
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