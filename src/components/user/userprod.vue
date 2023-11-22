<template>

  <br>
    <br>
    <br>
    <br>
    <br>
    <br>
 <!-- <div style="margin-left:450px;"> -->
    <br>
   
    <br>
           <h1 class="navbar-brand" href="index.html" style="font-size: 50px; "> Available|<span>Products...</span></h1>
           <br>
           <br>
           
           <div>
            <label for="category_id" class="label">Category</label>
            <div class="select-wrapper" style="margin-left: 100px;">
              <select v-model="category_id" @change="filterProducts" class="select">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.category_name }}
                </option>
              </select>
              <i class="fas fa-caret-down arrow-icon"></i>
            </div>
          </div>
<!--show products----------------------------------------------------------------->


  <!-- Your existing template code here -->
  <div class="row">
    <div v-for="(product, index) in info" :key="product.id" class="col-lg-3 col-md-6">
      <div class="room-item">
        <img :src="product.image" alt="" style="width: 200px; height: 200px;">
        <div class="ri-text">
          <h4>{{ product.prod_name }}</h4>
          <table>
            <tbody>
              <tr>
                <td class="r-o">Unit Price:</td>
                <td>{{ product.unit_price }}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-outline-danger btn-sm" @click="preOrder(product.id)">Pre order</button>
        </div>
      </div>
    </div>
  </div>


           

          
           <br><br><br><br> <br><br>
           <div>
           </div>
           <br><br><br><br><br>
         <div class="row justify-content-end">
           <strong class="mb-4" style="margin-right: 100px; font-size: 50px;"></strong>
           <div class="col-md-7">   
           </div>
         </div>

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
  import axios from 'axios';
  
  export default {
    data() {
      return {  
        categories: [], 
        info: [],
      sizes: [],
      category_id: '',
      };
    },
    created() {
    this.getData();
  },
    methods: {

      async filterProducts() {
      try {
        if (this.category_id) {
          const response = await axios.get(`getProductsByCategory/${this.category_id}`);
          this.info = response.data;
        } else {
          this.getInfo(); // Fetch all products if no category selected
        }
      } catch (error) {
        console.error(error);
      }
    },
      async fetchCategories() {
        try {
          const response = await axios.get("getcat");
          this.categories = response.data; // Assuming response.data contains the categories array
        } catch (error) {
          console.error(error);
        }
      },
      async getData() {
      try {
        await Promise.all([this.getCategories(), this.getInfo(), this.getItemSizes()]);
      } catch (error) {
        console.error(error);
      }
    },
    async getInfo() {
      try {
        const response = await axios.get('getDatas');
        this.info = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get('getcat');
        this.categories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItemSizes() {
      try {
        const response = await axios.get('getsize');
        this.sizes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getSizeName(sizeId) {
      const size = this.sizes.find(size => size.size_id === sizeId);
      return size ? size.item_size : 'Unknown';
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(category => category.id === categoryId);
      return category ? category.category_name : 'Unknown';
    },
      
    },
    mounted() {
      this.fetchCategories(); // Fetch categories when the component is mounted      not finished yet insert products
    },
  };
  </script>






<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Style for the label */
.label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

/* Style for the select dropdown */
.select-wrapper {
  position: relative;
  width: 200px;
}

.select {
  padding: 8px 30px 8px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333333"><path d="M7 10l5 5 5-5z" /></svg>') no-repeat right 8px center/12px;
}

.arrow-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #333333;
  pointer-events: none;
}

</style>