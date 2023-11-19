<template>

	<nav class="neumorphic-navbar" :class="{ 'navbar-hidden': isNavbarHidden }">
				<a class="navbar-brand">Qmj<span>Ent.</span></a>
				<span style="margin-left:300px;" class="nav-item">
				  <router-link to="/home" class="nav-link">Home</router-link>
				</span>
				<span class="nav-item">
				  <router-link to="/about" class="nav-link">About</router-link>
				</span>
				<span class="nav-item">
				  <a href="/userServices" class="nav-link">Services</a>
				</span>
				<span class="nav-item">
				  <a href="/bookevents" class="nav-link">Book event</a>
				</span>
				<span class="nav-item">
				  <a href="userblog" class="nav-link">Blog</a>
				</span>
				<span class="nav-item">
				  <a href="/userproducts" class="nav-link">Products</a>
				</span>
				<span class="nav-item cta">
				  <router-link to="/contacts" class="nav-link">Contact Us</router-link>
				</span>
			  </nav>
	
	
</template>

<script>


export default {
  data() {
    return {
      isNavbarHidden: false,
      lastScrollTop: 0
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        this.isNavbarHidden = true;
      } else {
        // Scrolling up
        this.isNavbarHidden = false;
      }

      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
  }
};
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

body {
	margin: 0; /* Reset default margin */
	font-family: 'Your Chosen Font', sans-serif;
  }
  
  .neumorphic-navbar {
	position: fixed;
	top: 0;
	left: 0;
	width: 1100px;
	z-index: 1000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 10px 10px 30px #eeecec, -10px -10px 30px #ffffff;
	transition: top 0.3s; /* Smooth transition */
	margin-top: 35px;
	margin-left: 120px;
  }
  
  /* Hide the navbar when scrolled down */
  .navbar-hidden {
	top: -100px; /* Adjust based on the height of your navbar */
  }
  .neumorphic-navbar a {
	color: rgb(14, 13, 13)262;
	text-decoration: none;
	padding: 8px 15px;
	border-radius: 3px;
	transition: all 0.3s ease;
  }
  
  /* Navbar link hover styles */
  .neumorphic-navbar a:hover {
	background-color: #e9e1e1;
	box-shadow: 5px 5px 10px #bcbcbc, -5px -5px 10px #ffffff;
	color: #1b1b1b; /* Change text color on hover */
  }
  
</style>