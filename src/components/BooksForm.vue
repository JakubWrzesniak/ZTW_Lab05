<template>
    <div id="books-form">
        <b-form @submit.prevent="handleSubmit">
        <label>Tytuł</label>
        <b-form-input v-model="book.title" type="text" />
        <label>Autor</label>
        <b-form-select v-model="book.authorId">
            <option :value="null" disabled>-- Please select an option --</option>
            <option v-for="author in authorsSource" :key="author.id" :value="author.id">
                {{author.id}} - {{ author.name }} {{author.surname}}
            </option>
        </b-form-select>
        <label>Liczba stron</label>
        <b-form-input v-model="book.pages" type="number" />
        <button>Dodaj książkę</button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: 'books-form',
        props: {
            authorsSource: Array,
        },
        data() {
            return {
                submitting: false,
                error: false,
                success: false, 
                book: {
                    title: '',
                    authorId: null,
                    pages: 0,
                },
                authors: []
            }
        },
        methods: {
            handleSubmit() {
                this.submitting = true
                this.clearStatus() 
                if (this.invalidName || this.invalidPageNumber) {
                this.error = true
                return
                } 

               fetch('http://localhost:8080/create/book', {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(this.book)
                }).then(res => res.json())
                .then(res => console.log(res))
                .then(res => this.$emit('add:book', res));

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
        },
         computed: {
            invalidName() {
                return this.book.title === ''
            }, 
            invalidPageNumber() {
                return this.book.pages < 0
            }
         }

    }
</script>
