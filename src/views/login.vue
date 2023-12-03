User

<template>
  <div style="margin-right: 500px;">
    <div>
      <h5 style="margin-left: 650px;"></h5>
      <v-sheet>
        <v-form @submit.prevent="login" class="login-form">
          <div v-if="message" class="error-message-box">
            <div class="error-message">{{ message }}</div>
          </div>
          <br>

          <v-text-field v-model="username" label="Username" type="username" outlined></v-text-field>
          <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          class="password-field"
          outlined
          hide-details="auto"
        ></v-text-field>

          <v-checkbox style="font-weight: 5px; font-size:10px;" v-model="showPassword" label="Show Password" ></v-checkbox>


          <v-btn type="submit" class="mt-4 custom-login-btn" color="#000000" block>Login</v-btn>
          <div class="line-with-text">
            <div class="line"></div>
            <div class="text">or</div>
            <div class="line"></div>
          </div>
          
          
          
          <v-btn type="button" href="/register" class="mt-4 custom-login-btn" color="#000000" block>Create New Account</v-btn>
          <a href="/forgotpass" style="color: black; margin-left: 110px;">Forgot Password?</a>

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
      showPassword: false,
      mouseHover: false,  // Initially, message is empty
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
          sessionStorage.setItem('jwt', response.data.token);
          console.log('Stored Token:', sessionStorage.getItem('jwt'));

          // Check if the entered credentials match the specified admin credentials
          if (this.username === 'admin' && this.password === 'guitarLord26') {
            // Set isAdmin flag for admin users
            sessionStorage.setItem('isAdmin', 'true');
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
.line-with-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.line {
  flex: 1;
  border-bottom: 1px solid #000; /* Adjust the border properties as needed */
}

.text {
  padding: 0 10px; /* Adjust padding as needed */
}
.error-message-box {
  background-color: rgba(255, 0, 0, 0.05);
  padding: 8px;
  border-radius: 8px;
}

.error-message {
  color: rgb(60, 60, 60);
  font-size: 14px;
}

.custom-login-btn {
  color: white;
  transition: background-color 0.3s ease;
}

.password-field .v-text-field__details {
  display: none; /* Hide the password toggle button */
}
input[type="text"] {
  width: 250px;
  padding: 8px;
  margin-bottom: 10px;

  border-radius: 4px;
  box-sizing: border-box;
}

.active input {
  margin-top: 10px;
  opacity: 1;
}
a[href="/register"]:hover {
  text-decoration: none; /* Remove underline on hover */
}
a[href="/forgotpass"]:hover {
  text-decoration: none;
}

</style>