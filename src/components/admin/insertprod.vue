<template>
    <div>
      <form @submit.prevent="save">
        <label for="category_id">Category</label>
        <select v-model="category_id">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.category_name }}
          </option>
        </select>

        <label for="size_id">Size</label>
          <select v-model="size_id">
            <option v-for="size in sizes" :key="size.size_id" :value="size.size_id">
              {{ size.item_size }}
            </option>
          </select>
        
        <br>
        <br>
        <label for="image">Image</label>
        <input type="file" @change="onFileChange">
        <!-- Show a preview of the selected image -->
        <img v-if="imageUrl" :src="imageUrl" alt="Selected Image" style="max-width: 200px; max-height: 200px;">
        <br>
        <label for="prod_name">Product</label>
        <input type="text" placeholder="prod_name" v-model="prod_name">
        <br>
        <label for="stock">Stock</label>
        <input type="text" placeholder="stock" v-model="stock">
        <br>
        <label for="price">Total Price</label>
        <input type="text" placeholder="price" v-model="price">
        <br>
        <label for="unit_price">Unit Price</label>
        <input type="text" placeholder="unit_price" v-model="unit_price">
        <br>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        category_id: "",
        size_id: "",
        image: "", 
        imageUrl: "", 
        prod_name: "",
        stock: "",
        price: "",
        categories: [], 
        sizes: [],
      };
    },
    methods: {
      async save() {
      try {
        const formData = new FormData();
        formData.append("category_id", this.category_id);
        formData.append("size_id", this.size_id);
        formData.append("image", this.image);
        formData.append("prod_name", this.prod_name);
        formData.append("stock", this.stock);
        formData.append("price", this.price);
        formData.append("unit_price", this.unit_price); // Include unit_price

        const response = await axios.post("sav", formData);
        // Handle response if needed
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
      async fetchsizes(){
        try {
          const response =await axios.get("getsize");
          this.sizes = response.data
        } catch (error) {
          console.error(error);
        }
      },
      onFileChange(event) {
        // Update image and imageUrl when a file is selected
        if (event.target.files && event.target.files[0]) {
          this.image = event.target.files[0];
          this.imageUrl = URL.createObjectURL(event.target.files[0]);
        }
      },
    },
    mounted() {
      this.fetchCategories();
      this.fetchsizes(); // Fetch categories when the component is mounted      not finished yet insert products
    },
  };
  </script>
  