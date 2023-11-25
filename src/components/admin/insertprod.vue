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
        <input type="file" accept="image/*" @change="handleImageUpload">
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
        image: null,
        prod_name: "",
        stock: "",
        price: "",
        unit_price: "",

        imageUrl: null, 
        categories: [], 
        sizes: [],
        prods: [],
      };
    },
    created() {
      this.refreshData();
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
                formData.append("unit_price", this.unit_price);

                const product = await axios.post("save", formData);

                console.log("Product saved successfully:", product);

                // Reset form fields or perform other actions after saving
                this.category_id = "";
                this.size_id = "";
                this.image = null;
                this.prod_name = "";
                this.stock = "";
                this.price = "";
                this.unit_price = "";

                this.getInfo();
                this.$emit("refreshData");
            } catch (error) {
                console.error("Error saving product:", error);
            }
        },
    async refreshData() {
      try {
        const response = await axios.get("getDatas");
        this.prods = response.data;

        this.prods.forEach(room => {
          console.log('Product Data:', room);
        });
      } catch (error) {
        console.error("Error fetching prods:", error);
      }
    },
    handleImageError(event) {
      console.error('Error loading image:', event.target.src);

    },
        handleImageUpload(event) {
          this.image = event.target.files[0];
        },
        getBase64Image(file){
          return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
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
    },
    mounted() {
      this.fetchCategories();
      this.fetchsizes(); // Fetch categories when the component is mounted      not finished yet insert products
    },
  };
  </script>
  