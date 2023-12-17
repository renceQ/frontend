<template>

    <div>
        <img style="width:50px; height:50px; margin-top:30px;"  v-if="info.length > 0" :src="info[0].profile_picture" alt="Profile" class="profile-picture-navbar">
    </div>
    <div>

        <div class="neumorphic-search" style="margin-top: 170px; margin-left:315px;">
            <input type="text" placeholder="Search..." class="search-input" />
            <button style="position:absolute; margin-left:602px; width:49px; height: 49px; " class="search-button">
                <i class="fas fa-search"></i>
              </button>
          </div>
             


        <nav class="neumorphic-navbar" style="margin-top: 230px; width:950px; height:60px; margin-left: 315px; ">
        <span class="nav-item"></span>
               
    
                    <span class="nav-item">
                      <router-link to="/home" class="nav-link">To Ship</router-link>
                    </span>
                    <span class="nav-item">
                      <router-link to="/about" class="nav-link">To Recive</router-link>
                    </span>
                    <span class="nav-item">
                      <a href="/userServices" class="nav-link">Completed</a>
                    </span>
                    <span class="nav-item">
                      <a href="userblog" class="nav-link">Returns and Cancelation</a>
                    </span>
                    <a style="margin-left:190px;"  class="navbar-brand">Qmj<span>Ent.</span></a>
    
                  </nav>
                </div>

</template>
<script>
export default {
  data() {
    return {
        isNavbarHidden: false,
      lastScrollTop: 0,
      inputValue: '',
      isActive: false,
      isProcessing: false,
      infos: [],
	    info: [],
      token: '',
    };
  },
  mounted() {
	this.getInfo(); 
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
    activateFinder() {
      this.isActive = true;
    },
    deactivateFinder() {
      if (this.inputValue.length === 0) {
        this.isActive = false;
      }
    },
    submitForm() {
      this.isProcessing = true;
      this.isActive = false;
      this.$refs.icon.classList.remove('active');
      this.$refs.icon.classList.add('processing');
      this.inputValue = ''; // Clear input value

      setTimeout(() => {
        this.isProcessing = false;
        this.$refs.icon.classList.remove('processing');
        this.inputValue = ''; // Clear input value again

        if (this.inputValue.length > 0) {
          this.isActive = true;
          this.$refs.icon.classList.add('active');
        }
      }, 1000);
    }
  }
};
</script>

<style>
.neumorphic-search {
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 10px 10px 30px #eeecec, -10px -10px 30px #ffffff;
    padding: 8px;
    height: 40px;
    margin-top: 35px; /* Adjust this margin as needed */
    margin-left: 70px; /* Adjust this margin as needed */
    width: 600px;
  }

  .search-input {
    height: 36px;
    margin-top: 2px;
    border: none;
    outline: none;
    flex: 1;
    padding: 8px;
    border-radius: 5px;
    box-shadow: inset 2px 2px 5px #c9c9c9, inset -2px -2px 5px #ffffff;
  }

  .search-button {
    background-color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 5px;
    margin-left: 8px;
    margin-bottom: 12px;
    width: 40px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  }

</style>
