<template>
    <b-row>
        <b-col  cols="4">
            <b-card v-if="!edit && authorSource != null" :header="authorSource.id" :title="authorSource.name + ' ' +authorSource.surname" :footer="message">
                <b-button @click="editMode()" variant='outline-warning'>Edit</b-button>
                <b-button @click="deleteAuthor()" variant='outline-danger'>Delete</b-button>
            </b-card>
             <b-card v-if="edit && authorSource != null" header="Edit">
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group 
                        id="idGroup"
                        lable="id"
                        label-for="ud"
                    >
                        <b-form-input
                            id="id"
                            v-model="author.id"
                            type="number"
                            required
                            disabled
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group 
                        id="nameGroup"
                        lable="name"
                        label-for="name"
                        description="New author name"
                    >
                        <b-form-input
                            id="name"
                            v-model="author.name"
                            type="text"
                            required
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group 
                        id="surnameGroup"
                        lable="surname"
                        label-for="surname"
                        description="New author surname"
                    >
                        <b-form-input
                            id="surname"
                            v-model="author.surname"
                            type="text"
                            required
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-button type="reset" variant='outline-warning'>Discard Changes</b-button>
                    <b-button type="submit" variant='outline-success'>Save</b-button>
                </b-form>
            </b-card>
        </b-col>
        <b-col cols="8">
            <b-table-simple stripped hover :items="books">
                <b-thead>
                    <b-th>Id</b-th>
                    <b-th>Tytuł</b-th>
                    <b-th>Liczba stron</b-th>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="book in books" :key = "book.id">
                        <b-td>{{ book.id }}</b-td>
                        <b-td><router-link :to="'/book/' + book.id">{{ book.title }}</router-link></b-td>
                        <b-td>{{ book.pages}}</b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-col>
    </b-row>
</template>

<script>

export default{
    name: 'author-details',
    props: {
        authorSource: Object
    },
    data(){ 
        return{
            books: [],
            edit: false,
            author:{
                id: 0,
                name: '',
                surname: '',
            },
            success: false,
            error: false,
            message: '',
        }
    },
    methods: {
        getBooks(){
            if(this.authorSource != null){
                fetch("http://127.0.0.1:8080/getbooks/author/" + this.authorSource.id)
                .then(res => res.json())
                .then(res => this.books = res)
                .catch(error => console.log(error))
                console.log(this.books);
            }

        },
        getEditData(){
            if(this.authorSource != null){
                this.author.id = this.authorSource.id;
                this.author.name = this.authorSource.name;
                this.author.surname = this.authorSource.surname;
            }
        },
        editMode(){
            this.getEditData();
            this.edit = true;
        },
        onSubmit(){
            fetch(
                "http://localhost:8080/update/author/" + this.author.id,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.author)
                }
            ).then(res => {
                if(res.status == 200){
                    this.edit = false;
                    this.success = true;
                    this.error = false;
                    this.message = 'Dane autora został zmienione'
                } else {
                    this.success = false;
                    this.error = true;
                    this.message = 'Coś poszło nie tak. Spróbuj ponowanie później'
                }
            })
            .catch(error => console.log(error))
            this.$emit('edit:author', this.author)
        },    
        onReset(){
            this.edit = false;
            this.message = ''
        },
        deleteAuthor(){
            fetch(
                "http://localhost:8080/delete/author/" + this.authorSource.id,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                }
            ).then(res => {
                if(res.status == 200){
                    this.success = true
                    this.error = false
                    this.$router.push({name: 'authors'})
                } else {
                    this.success = false
                    this.error = true
                }
                this.message = 'Nie mozna usunac autora'
            }).catch(error => console.log(error))
        }
    },
    mounted(){
        this.getBooks()
        this.getEditData()
    },
    updated(){
        this.getBooks()
        this.getEditData()
    },
}
</script>
<style scoped>

</style>
