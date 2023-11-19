
<template> 
    <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">Login</h5>
    
                <v-sheet width="300" class="mx-auto">
                  <v-form fast-fail @submit.prevent="login">
                    <div v-if="message === 'error'" class="alert alert-danger">Invalid response</div>
    
                    <v-text-field v-model="username" label="Username"></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
    
                    <v-btn type="submit" block class="mt-2 btn btn-warning">Submit</v-btn>
                    <router-link to="/register" class="d-block text-center mt-2">Register</router-link>
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
    
            data(){ 
    
                return { 
    
                    username: '', 
    
                    password: '', 
    
                    message: [], 
    
                } 
    
            }, 
    
            methods:{ 
    
                async login(){ 
    
                    const data = await axios.post("api/login",{ 
    
                    username: this.username, 
    
                    password: this.password 
    
                    }); 
    
                    this.message = data.data.msg; 
    
                    if(data.data.msg ==='okay'){ 
    
                    sessionStorage.setItem("jwt", data.data.token) 
    
                    router.push('/home'); 
    
                    } 
    
                    
    
                } 
    
            } 
    
            } 
    
        </script>