<template>


  
    <section class="ftco-section contact-section">
      <div class="container">
        <div class="row d-flex mb-5 contact-info">
          <div class="col-md-12 mb-4">
            <h2 class="h3">Contact Information</h2>
          </div>
          <div class="w-100"></div>
          <div class="col-md-3">
            <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
          </div>
          <div class="col-md-3">
            <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
          </div>
          <div class="col-md-3">
            <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
          </div>
          <div class="col-md-3">
            <p><span>Website</span> <a href="#">yoursite.com</a></p>
          </div>
        </div>
  
        <div class="row block-9">
            <div class="col-md-6 order-md-last d-flex">
              <form @submit.prevent="save" class="bg-light p-5 contact-form">
                <div class="form-group">
                  <label for="trackcode">Track Code</label>
                  <input type="text" class="form-control" placeholder="trackcode" v-model="trackcode" id="trackcode">
                </div>
                <div class="form-group">
                  <label for="firstname">Firstname</label>
                  <input type="text" class="form-control" placeholder="firstname" v-model="firstname" id="firstname">
                </div>
                <div class="form-group">
                  <label for="middlename">Middle Name</label>
                  <input type="text" class="form-control" placeholder="middlename" v-model="middlename" id="middlename">
                </div>
                <div class="form-group">
                  <label for="lastname">Last Name</label>
                  <input type="text" class="form-control" placeholder="lastname" v-model="lastname" id="lastname">
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" placeholder="email" v-model="email" id="email">
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary py-3 px-5">Send Request</button>
                </div>
              </form>
            </div>
          </div>

          <!-- ulit lay out ng fields at save functions sa script -->
  
        <div class="col-md-6 d-flex">
          <div id="map" class="bg-white"></div>
        </div>
      </div>
    </section>
  
    <section class="ftco-section-parallax">
      <div class="parallax-img d-flex align-items-center">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-7 text-center heading-section heading-section-white ">
              <h2>Subscribe to our Newsletter</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
              <div class="row d-flex justify-content-center mt-4 mb-4">
                <div class="col-md-8">
                  <form action="#" class="subscribe-form">
                    <div class="form-group d-flex">
                      <input type="text" class="form-control" placeholder="Enter email address">
                      <input type="submit" value="Subscribe" class="submit px-3">
                    </div>
                  </form>
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
                <li><a href="#" class="py-2 d-block">Schedule</a></li>
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
import axios from 'axios';
export default{
    data(){
        return{
            trackcode:"",
            firstname:"",
            middlename:"",
            lastname:"",
            email:"",
            date:"",
        }
    },
    methods:{
        async save(){
            try {
                const ins = await axios.post("save",{
                    trackcode: this.trackcode,
                    firstname: this.firstname,
                    middlename: this.middlename,
                    lastname: this.lastname,
                    email: this.email,
                });
                    this.trackcode = "";
                    this.firstname = "";
                    this.middlename = "";
                    this.lastname = "";
                    this.email = "";

                this.$emit('data-saved');
                this.getInfo();
                console.log(trackcode, firstname, middlename, lastname, email);
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }
    }
}
</script>

<style>

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