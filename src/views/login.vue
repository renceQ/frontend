
<template>
  <div style="margin-right: 500px;">
    <div>
      <h5 style="margin-left: 650px;">Login</h5>
      <v-sheet>
        <v-form @submit.prevent="login" class="login-form">
          <div v-if="message" class="error-message">{{ message }}</div>

          <v-text-field v-model="username" label="Username" type="username" outlined></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>

          <v-btn type="submit" class="mt-4 custom-login-btn" color="#000000" block>Login</v-btn>
          <router-link to="/register" style="color: black; margin-left: 150px;">Register</router-link>
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
      message: '', // Initially, message is empty
    };
  },
  
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.message = 'Please fill in both the username and password';
        return;
      }
      
      try {
        const response = await axios.post('api/login', {
          username: this.username,
          password: this.password,
        });

        if (response.data.msg === 'okay') {
          localStorage.setItem('jwt', response.data.token);

          // Check if the entered credentials match the specified admin credentials
          if (this.username === 'admin' && this.password === 'guitarLord26') {
            // Set isAdmin flag for admin users
            localStorage.setItem('isAdmin', 'true');
            router.push('/admin'); // Redirect to '/admin' if admin credentials match
          } else {
            router.push('/home'); // Redirect to '/home' if non-admin credentials
          }
        } else {
          // Differentiate between invalid password and non-existent account
          if (response.data.msg === 'error') {
            this.message = 'Invalid password';
          } else {
            this.message = 'Account does not exist';
          }
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network errors or unexpected errors
        this.message = 'Error occurred while logging in';
      }
    },
  },
};
</script>


<style>
/* Add CSS style to display the error message */
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
