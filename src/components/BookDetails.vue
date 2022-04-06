<template>
    <b-row>
        <b-col  cols="6">
            <b-card v-if="!edit && bookSource != null" :header="book.id" :title="book.title" :footer="message">
                <b-card-body>
                    <p>Ilośc stron: {{book.pages}}</p>
                </b-card-body>
                <b-button @click="editMode()" variant='outline-warning'>Edit</b-button>
                <b-button @click="$router.push({name: 'deletebook', params: {id: book.id },})" variant='outline-danger'>Delete</b-button>
            </b-card>
             <b-card v-if="edit && bookSource != null" header="Edit">
                <b-form @submit.prevent="handleSubmit">
                    <label>Tytuł</label>
                    <b-form-input 
                        v-model="book.title" 
                        type="text" 
                        :class="{ 'has-error': submitting && invalidName }" 
                        @focus="clearStatus"
                        @keypress="clearStatus" 
                    />
                    <label>Autor</label>
                    <b-form-select 
                        v-model="book.author">
                        <option :value="null" disabled>-- Please select an option --</option>
                        <option v-for="author in authors" :key="author.id" :value="author.id">
                            {{author.id}} - {{ author.name }} {{author.surname}}
                        </option>
                    </b-form-select>
                    <label>Liczba stron</label>
                    <b-form-input 
                        v-model="book.pages" 
                        type="number"
                        :class="{ 'has-error-page': submitting && invalidPageNumber }" 
                        @focus="clearStatus"
                        @keypress="clearStatus" 
                      />
                    <p v-if="error && submitting" class="error-message">
                        Proszę wypełnić wskazane pola formularza
                    </p>
                    <p v-if="success" class="success-message">
                        Dane poprawnie zapisano
                    </p>
                    <b-button type="subbmit" variant="outline-success">Zapisz</b-button> 
                </b-form>
            </b-card>
        </b-col>
        <b-col cols="6">
            <b-card v-if="bookSource != null && bookSource.author != null " header="Author" :title="bookSource.author.id + ' - ' + bookSource.author.name + ' ' + bookSource.author.surname">
                <b-button  @click="$router.push({name: 'author-details', params: {id: book.author },})" variant='outline-info'>Szczegóły</b-button>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>

export default{
    name: 'book-details',
    props: {
        bookSource: Object
    },
    data(){ 
        return{
            book: {
                id: 0,
                title: '',
                author: 0,
                pages: 0
            },
            authors: [],
            edit: false,
            success: false,
            error: false,
            message: '',
        }
    },
    methods: {
        getAuthors(){
                fetch("http://127.0.0.1:8080/get/authors")
                .then(res => res.json())
                .then(res => this.authors = res)
                .catch(error => console.log(error))
        },
        getEditData(){
            if(this.bookSource != null){
                this.book.id = this.bookSource.id;
                this.book.title = this.bookSource.title;
                this.book.author = this.bookSource.author.id;
                this.book.pages = this.bookSource.pages;
            }
        },
        editMode(){
            this.getEditData();
            this.edit = true;
            this.getAuthors();

        },
         handleSubmit() {
                this.submitting = true
                this.clearStatus() 
                if (this.invalidName || this.invalidPageNumber) {
                this.error = true
                return
                } 

               fetch('http://localhost:8080/update/book/' + this.bookSource.id, {
                method: 'PUT',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(this.book)
                })
                .then(res => {
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
                .then(this.$emit('update:book', this.book.id));

                this.book = {
                    title: '',
                    authorId: null,
                    pages: 0,
                }

                this.error = false
                this.success = true
                this.submitting = false
            },
            clearStatus() {
                this.success = false
                this.error = false
            }, 
        onReset(){
            this.edit = false;
            this.message = ''
        },
    },
    computed: {
            invalidName() {
                return this.book.title === ''
            }, 
            invalidPageNumber() {
                return this.book.pages < 0
            }
         },
    mounted(){
        this.getEditData()
    },
    updated(){
        this.getEditData()
    },
}
</script>
<style scoped>

</style>
