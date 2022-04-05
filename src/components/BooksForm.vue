<template>
    <div id="books-form">
        <form @submit.prevent="handleSubmit">
        <label>Tytuł</label>
        <input v-model="book.title" type="text" :class="{ 'has-error': submitting && invalidName }" 
        @focus="clearStatus"
        @keypress="clearStatus" 
        />
        <label>Autor</label>
        <input v-model="book.authorId" type="number" />
        <label>Liczba stron</label>
        <input v-model="book.pages" type="number"
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
        <button>Dodaj książkę</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'books-form',
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

<style scoped>
 form {
 margin-bottom: 2rem;
 }

 [class*='-message'] {
 font-weight: 500;
 }
 .error-message {
 color: #d33c40;
 }
 .success-message {
 color: #32a95d;
 }
</style>
 
