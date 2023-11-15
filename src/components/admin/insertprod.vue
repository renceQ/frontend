<template>
    <div>
      <form @submit.prevent="save">
        <label for="category_id">Category</label>
        <select v-model="category_id">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.category_name }}
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
        <label for="price">Price</label>
        <input type="text" placeholder="price" v-model="price">
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
        image: null, // Changed to null to hold the file object
        imageUrl: "", // To display preview of the selected image
        prod_name: "",
        stock: "",
        price: "",
        categories: [], // Array to hold categories fetched from API
      };
    },
    methods: {
      async save() {
        try {
          const formData = new FormData();
          formData.append("category_id", this.category_id);
          formData.append("image", this.image);
          formData.append("prod_name", this.prod_name);
          formData.append("stock", this.stock);
          formData.append("price", this.price);
  
          const response = await axios.post("save", formData);
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
      onFileChange(event) {
        // Update image and imageUrl when a file is selected
        if (event.target.files && event.target.files[0]) {
          this.image = event.target.files[0];
          this.imageUrl = URL.createObjectURL(event.target.files[0]);
        }
      },
    },
    mounted() {
      this.fetchCategories(); // Fetch categories when the component is mounted
    },
  };
  </script>
  