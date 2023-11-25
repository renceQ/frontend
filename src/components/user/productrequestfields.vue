<template>


    <!--di pa tapos kukunin kopa user session at ilalabas address at contacts sa pag kuha ng product-->
    <div class="container mt-4">
      <h2>Product Request Fields</h2>
      <div class="row">
        <div class="col">
          <p>Image:</p>
          <img :src="productData.image" alt="Product Image" class="img-fluid" style="max-width: 200px; max-height: 200px;">
          <p>Product Name: {{ productData.prod_name }}</p>
          <p>Unit Price: {{ productData.unit_price }}</p>
          <div class="mb-3">
            <p>Quantity:</p>
            <div class="btn-group" role="group" aria-label="Quantity">
              <button @click="decreaseQuantity" type="button" class="btn btn-secondary" style="height:38px;">-</button>
              <p class="btn btn-secondary">{{ quantity }}</p>
              <button @click="increaseQuantity" type="button" class="btn btn-secondary" style="height:38px;">+</button>
            </div>
            <div class="mb-3">
                <label for="size_id">Size:</label>
                <div class="btn-group" role="group" aria-label="Size">
                  <select v-model="size_id" class="btn btn-secondary">
                    <option v-for="size in productData.sizes" :key="size.size_id" :value="size.size_id">{{ size.item_size }}</option>
                  </select>
                </div>
          </div>
        
          </div>
          <router-link to="/userproducts" class="btn btn-primary">Choose Another Product</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        productData: {
          image: '',
          prod_name: '',
          unit_price: '',
          sizes: []
        },
        quantity: 1, // Initial quantity
        size_id: '' // Selected size
      };
    },
    created() {
      // Fetch data when the component is created
      this.getProductDetails();
    },
    methods: {
      getProductDetails() {
        // Access the route params and assign them to the productData object
        this.productData.image = this.$route.params.image || '';
        this.productData.prod_name = this.$route.params.prod_name || '';
        this.productData.unit_price = this.$route.params.unit_price || 0;
        // Fetch other necessary details or perform operations here
      },
      increaseQuantity() {
        // Increment quantity when + button is clicked
        this.quantity += 1;
      },
      decreaseQuantity() {
        // Decrement quantity when - button is clicked, ensure the quantity doesn't go below 1
        if (this.quantity > 1) {
          this.quantity -= 1;
        }
      },
      async fetchSizes() {
        try {
          const response = await axios.get("getsize");
          this.productData.sizes = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
    mounted() {
      this.fetchSizes();
    },
  };
  </script>
  
  <style>
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
  </style>
  