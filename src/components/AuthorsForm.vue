<template>
    <div id="authors-form">
        <form @submit.prevent="handleSubmit">
        <label>Imię</label>
        <input v-model="author.name" type="text" :class="{ 'has-error': submitting && invalidName }" 
        @focus="clearStatus"
        @keypress="clearStatus" 
        />
        <label>Nazwisko</label>
        <input v-model="author.surname" type="text" :class="{ 'has-error': submitting && invalidSurname }" 
        @focus="clearStatus"
        @keypress="clearStatus" 
        />
        <p v-if="error && submitting" class="error-message">
        Proszę wypełnić wskazane pola formularza
        </p>
        <p v-if="success" class="success-message">
        Dane poprawnie zapisano
        </p>
        <button>Dodaj autora</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'authors-form',
        data() {
            return {
                submitting: false,
                error: false,
                success: false, 
                author: {
                name: '',
                surname: '',
                },
            }
        },
        methods: {
            handleSubmit() {
                this.submitting = true
                this.clearStatus() 
                if (this.invalidName || this.invalidSurname) {
                this.error = true
                return
                } 

               fetch('http://localhost:8080/create/author', {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(this.author)
                }).then(res => res.json())
                .then(res => console.log(res))
                .then(res => this.$emit('add:author', res));

                this.author = {
                name: '',
                surname: '',
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
                return this.author.name === ''
            },
            invalidSurname() {
                return this.author.surname === ''
            },  
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