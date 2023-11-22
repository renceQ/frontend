<template>
    <br>
    
    <section class="hero-wrap hero-wrap-2 js-fullheight" style="background-image: url('images/bg_2.jpg');" data-stellar-background-ratio="0.5">
      <div style="display: flex; align-items: center; justify-content: flex-end;">
        <div style="margin-right: 50px; margin-left: 200px; margin-bottom: 140px;">
          <br>
          <br>
          <br>
          <br>
          <br>
          <h1 class="navbar-brand" href="index.html" style="font-size: 50px; margin-left: 110px;"> Book|<span>US now...</span></h1>
          <br>
          <div>
           
            <form @submit.prevent="saveBooking" class="container mt-5 p-4 bg-light rounded shadow-lg" style="margin-right:350px;">
              <h2 class="mb-4">Request for event</h2>
              
              <!-- Event Information -->
              <div class="form-group">
                <label for="event_title">Event Title:</label>
                <input type="text" class="form-control" placeholder="Event Title" v-model="event_title" required>
              </div>
              
              <div class="form-group">
                <label for="start_date">Start Date:</label>
                <input type="date" class="form-control" v-model="start_date" required>
              </div>
              
              <div class="form-group">
                <label for="end_date">End Date:</label>
                <input type="date" class="form-control" v-model="end_date" required>
              </div>
              
              <div class="form-group">
                <label for="location">Location:</label>
                <input type="text" class="form-control" placeholder="Location" v-model="location" required>
              </div>
              
              <div class="form-group">
                <label for="event_description">Description:</label>
                <textarea class="form-control" v-model="event_description" placeholder="Other Description" required></textarea>
              </div>
              
              <!-- Attendee Information -->
              <h3>Contact Details</h3>
              
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" placeholder="Name" v-model="name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" placeholder="Email Address" v-model="email" required>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" class="form-control" placeholder="Phone" v-model="phone" required>
              </div>
              
              <button type="submit" class="btn btn-primary">Book Event</button>
            </form>
          </div>
          <br>
    
        </div>
        <img :src="require('../../assets/images/logo2.jpg')" alt="Description of the image" style="border-radius: 10px; width: 450px; margin-right: 100px;margin-bottom: 700px;">
      </div>
    </section>
    
  
    <section class="ftco-section d-md-flex bg-light" id="sec1">
      <div class="container" >
        <div class="row justify-content-end">
          <div class="col-md-7">
            <h6>With 19 years of invaluable experience, QMJ Enterprises stands as a 
              seasoned <br><br>expert in creating exceptional and memorable experiences. Over nearly two decades,<br>
              <br>their expertise which ensures every client receives unparalleled service and enduring<br><br>
               satisfaction.</h6>
          </div>
        </div>
      </div>
    </section>
  
    <section class="ftco-counter img" id="section-counter">
      <div class="container">
        <div class="row d-flex">
          <div class="col-md-6 d-flex">
            <img :src="require('../../assets/images/log.jpg')" alt="Description of the image" style="border-radius: 10px; width: 500px; margin-right: 100px; margin-top: 80px;margin-bottom: 100px;">
          </div>
          <div class="col-md-6 pl-md-5 py-5">
            <div class="row justify-content-start pb-3">
              <div class="col-md-12 ">
                <span class="subheading">Fun Facts</span>
                <h2 class="mb-4"><span>Fun</span> Facts</h2>
                <p>wala pako datasssssssssssssssssssss</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 ">
                <div class="block-18 text-center py-4 bg-light mb-4">
                  <div class="text">
                    <div class="icon ">
                      <span class="flaticon-guest"></span>
                    </div>
                    <strong class="number" data-number="30">31</strong>
                    <span>Speakers</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 ">
                <div class="block-18 text-center py-4 bg-light mb-4">
                  <div class="text">
                    <div class="icon d-flex justify-content-center align-items-center">
                      <span class="flaticon-handshake"></span>
                    </div>
                    <strong class="number" data-number="200">13</strong>
                    <span>Sponsor</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 ">
                <div class="block-18 text-center py-4 bg-light mb-4">
                  <div class="text">
                    <div class="icon d-flex justify-content-center align-items-center">
                      <span class="flaticon-chair"></span>
                    </div>
                    <strong class="number" data-number="2500">21</strong>
                    <span>Total Seats</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 ">
                <div class="block-18 text-center py-4 bg-light mb-4">
                  <div class="text">
                    <div class="icon d-flex justify-content-center align-items-center">
                      <span class="flaticon-idea"></span>
                    </div>
                    <strong class="number" data-number="40">42</strong>
                    <span>Topics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  
    <footer class="ftco-footer ftco-bg-dark ftco-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Eventalk</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4 ml-md-5">
              <h2 class="ftco-heading-2">Useful Links</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Speakers</a></li>
                <li><a href="#" class="py-2 d-block">Shcedule</a></li>
                <li><a href="#" class="py-2 d-block">Events</a></li>
                <li><a href="#" class="py-2 d-block">Blog</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
             <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Privacy</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Career</a></li>
                <li><a href="#" class="py-2 d-block">About Us</a></li>
                <li><a href="#" class="py-2 d-block">Contact Us</a></li>
                <li><a href="#" class="py-2 d-block">Services</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li><span class="icon icon-map-marker"></span><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                  <li><a href="#"><span class="icon icon-phone"></span><span class="text">+2 392 3929 210</span></a></li>
                  <li><a href="#"><span class="icon icon-envelope"></span><span class="text">info@yourdomain.com</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
  
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
  data() {
    return {
        event_title:"", 
        start_date:"", 
        end_date:"", 
        location:"", 
        event_description:"", 
        name:"", 
        email:"", 
        phone:"", 
      info: [],
    }
  },
  created() {
  },
  methods: {
    async saveBooking() {
      try {
        const ins = await axios.post("saveBooking", {
          event_title: this.event_title,
          start_date: this.start_date,
          end_date: this.end_date,
          location: this.location,
          event_description: this.event_description,
          name: this.name,
          email: this.email,
          phone: this.phone,
        });

        this.event_title ="";
        this.start_date ="";
        this.end_date ="";
        this.location ="";
        this.event_description ="";
        this.name ="";
        this.email ="";
        this.phone ="";


        this.$emit('data-saved');
        this.getInfo();
      } catch (error) {
        console.error(error);
      }
    },
  }
};
  </script>
  
  <style>
  @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900');
  @import '../../assets/css/open-iconic-bootstrap.min.css';
  @import '../../assets/css/animate.css';
  
  @import '../../assets/css/owl.theme.default.min.css';
  @import '../../assets/css/magnific-popup.css';
  @import '../../assets/css/aos.css';
  @import '../../assets/css/ionicons.min.css';
  
  @import '../../assets/css/flaticon.css';
  @import '../../assets/css/icomoon.css';
  @import '../../assets/css/style.css';
  </style>