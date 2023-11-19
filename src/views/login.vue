<template>
    <div style="margin-right: 500px;" >
      <div >
      
              <h5  style="margin-left: 650px;">Login</h5>
  
              <v-sheet >
                <v-form @submit.prevent="login" class="login-form">
                  <div v-if="message === 'error'" >Invalid credentials</div>
  
                  <v-text-field v-model="username" label="Username" type="username" outlined ></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password" outlined ></v-text-field>
  
                  <v-btn type="submit" class="mt-4 custom-login-btn" color="#000000" block>Login</v-btn>
                  <router-link to="/register" style="color:black; margin-left:150px;">Register</router-link>
                </v-form>
              </v-sheet>

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
        message: '',
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post("api/login", {
            username: this.username,
            password: this.password
          });
  
          if (response.data.msg === 'okay') {
            sessionStorage.setItem("jwt", response.data.token);
            router.push('/home');
          } else {
            this.message = 'error';
          }
        } catch (error) {
          console.error('Error:', error);
          this.message = 'error';
        }
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  