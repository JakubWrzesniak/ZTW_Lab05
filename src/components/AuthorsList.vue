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
                <td><b-button variant="link" @click="$router.push({name: 'deleteauthor', params: {id: author.id },})">Usuń autora</b-button></td>
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