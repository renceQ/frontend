<!-- Register     -->
    
<template>
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
        <div class="card">
            <div class="card-body">
            <h5 class="card-title text-center">Register</h5>

            <v-sheet width="300" class="mx-auto" style="background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <v-form fast-fail @submit.prevent="register">
                <div v-if="message === 'error'" style="color: rgb(35, 32, 32);">Invalid response</div>

                <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" outlined dense></v-text-field>
                <v-text-field v-model="passwordConfirm" label="Password Confirm" type="password" outlined dense></v-text-field>

                <div v-if="message === 'passwordMismatch'" style="color: rgb(35, 32, 32);">Passwords do not match</div>

                <v-btn type="submit" block class="mt-2" color="warning">Submit</v-btn>
                <router-link to="/" style="color: #FFFFCC;" class="d-block text-center mt-2">Login</router-link>
                </v-form>
            </v-sheet>

            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';


export default {
    data() {
    return {
        username: '',
        password: '',
        passwordConfirm: '',
        message: [],
    };
    },
    methods: {
    async register() {
        if (this.password === this.passwordConfirm) {
        const data = await axios.post("api/register", {
            username: this.username,
            password: this.password
        });

        this.message = data.data.msg;

        if (data.data.msg === 'okay') {
            alert("Registered successfully");
            router.push('/');
        }
        } else {
        this.message = "passwordMismatch";
        }
    }
    }
};
</script>