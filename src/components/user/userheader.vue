
<template>
	<div>
	<nav class="neumorphic-navbar" :class="{ 'navbar-hidden': isNavbarHidden }">
				<a class="navbar-brand">Qmj<span>Ent.</span></a>
				<!--profile picture-->
				<img style="width:50px; height:50px;"  v-if="info.length > 0" :src="info[0].profile_picture" alt="Profile" class="profile-picture-navbar">
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


        <div class="NOTIF">
          <nav class="navbar">
            <li class="menu-item">
              <a href="#">
                <i class="fas fa-bell"></i>
                <div v-if="filteredInfos.length > 0" class="notification-indicator">
                  {{ filteredInfos.length }}
                </div>
              </a>
              <ul class="dropdown" style="position: absolute; margin-right: 100px;">
                <li><h4>Notifications</h4></li>
                <!-- Filtered notifications -->
                <li v-for="filteredInfo in filteredInfos" :key="filteredInfo.id">
                  <a href="#">
                    {{ filteredInfo.prod_name }} - {{ filteredInfo.status }}
                    <!-- Show the token if needed -->
                    <span v-if="!hideToken">{{ token }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </nav>
        </div>

        
				<nav class="navbar">
					  <li class="menu-item" >
						<a href="#">Menu</a>
						<ul class="dropdown" style="margin-right: 200px; position:absolute;">
              <h2></h2>
						  <li><a href="#">View Your Profile</a></li>
						  <li><a href="#">Settings and Privacy</a></li>
						  <li><a href="#">Help and Support</a></li>
						  <li><a href="#" class="nav-link" @click="logout">Log out</a></li>
						</ul>
					  </li>
				  </nav>

        

			  </nav>
        

			  <router-view></router-view>
			</div>
			  <!-- <div style="margin-top: 150px;">
				Your form or insert component
				  <tbody>
					<tr v-for="userData in info" :key="userData.id">
					  <td>
						<div class="user-profile">
						  <img :src="userData.profile_picture" alt="" class="profile-picture">
						  <div class="profile-details">
							<div>{{ userData.username }}</div>
							<div>{{ userData.address }}</div>
							<div>{{ userData.contact }}</div>
							<div>{{ userData.other_info }}</div>
						  </div>
						</div>
					  </td>
					</tr>
				  </tbody>
	
			  </div> -->
        
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isNavbarHidden: false,
      lastScrollTop: 0,
	    info: [],
      infos: [],
      token: '',
    hideToken: true,
    };
  },
  computed: {
    filteredInfos() {
      // Filter the 'infos' array based on the token in session storage
      return this.infos.filter(info => info.token === this.token);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
	this.getInfo(); 
  this.getOrder();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
	this.token = sessionStorage.getItem('jwt');
  if (this.token) {
    this.getInfo();
  } else {
    // Handle the case where token is not available in local storage
    console.error('JWT token not found in session storage');
  }
},
  
  methods: {
    async getOrder() {
  try {
    const response = await axios.get('getOrder');
    this.infos = response.data;
    // Set hideToken to true after fetching notifications
    this.hideToken = true;
  } catch (error) {
    console.error(error);
  }
},
	async logout() {
		        sessionStorage.clear();
            // this.$router.push('/landing');
    },
	
	toggleDropdown() {
    const menu = document.querySelector('.menu-item');
    menu.classList.toggle('active');
  },
    async getInfo() {
    try {
      const response = await axios.get(`getUserData/${this.token}`);
      this.info = response.data; // Assuming response.data is an object/array of user data
    } catch (error) {
      console.error(error);
      // Handle the error case, such as showing a message to the user
    }
  },
  handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll <= 0) {
        // At the top of the page
        this.isNavbarHidden = false;
      } else {
        // Scrolled down
        this.isNavbarHidden = true;
      }

      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
  },
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

/* Common styles for the navbar */
.neumorphic-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 1200px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 10px 10px 30px #eeecec, -10px -10px 30px #ffffff;
  transition: top 0.3s;
  margin-top: 35px;
  margin-left: 70px;
}

.profile-picture-navbar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

/* Hide the navbar when scrolled down */
.navbar-hidden {
  top: -100px;
}

/* Navbar links */
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
  color: #1b1b1b;
}

/* Additional styles for user profile display */
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.profile-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333;
  font-size: 14px;
}

/* Dropdown styles */
.menu-item {
  position: relative;
  display: inline-block;
  z-index: 1;
}

.menu-item .dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-item:hover .dropdown,
.menu-item:focus-within .dropdown {
  display: block;
}

.menu-item a {
  display: block;
  text-decoration: none;
  color: #333;
}

.dropdown {
  width: 205px;
  margin-right: 300px;
  margin-top: 10px;
  display: none;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.dropdown li {
  display: block;
}

.dropdown li a {
  padding: 8px 15px;
  color: #333;
  text-decoration: none;
}
.menu-item > a {
	text-decoration: none;
  }
  
  /* Add this CSS to remove underline on hover for dropdown items */
  .dropdown li a:hover {
	text-decoration: none;
  }
  
  /* Add this CSS to hide dropdown when the menu is clicked again */
  .menu-item.active .dropdown {
	display: none;
  }
/* Responsive styles */
@media screen and (max-width: 768px) {
  .neumorphic-navbar {
    width: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px;
  }

  .profile-picture-navbar {
    width: 40px;
    height: 40px;
  }

  .neumorphic-navbar a {
    padding: 5px 10px;
  }
  /* Add more styles for smaller screens if needed */
}

.notification-container {
  position: relative;
}

.notification-indicator {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}


</style>