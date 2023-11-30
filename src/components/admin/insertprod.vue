<template>
  <div style="margin-right:100px;">
  <div>
    <form @submit.prevent="save">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="category_id">Category</label>
          <select class="form-control form-control-sm" v-model="category_id">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category_name }}
            </option>
          </select>
        </div>

        <div class="form-group col-md-6">
          <label for="size_id">Size</label>
          <select class="form-control form-control-sm" v-model="size_id">
            <option v-for="size in sizes" :key="size.size_id" :value="size.size_id">
              {{ size.item_size }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form-control-file form-control-sm" accept="image/*" @change="handleImageUpload">
        <img v-if="imageUrl" :src="imageUrl" alt="Selected Image" style="max-width: 200px; max-height: 200px;">
      </div>
      <br>

      <div class="form-group">
        <label for="prod_name">Product</label>
        <input type="text" class="form-control form-control-sm" placeholder="Product Name" v-model="prod_name">
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="stock">Stock</label>
          <input type="number" class="form-control form-control-sm" placeholder="Stock" v-model="stock" @input="calculateTotalPrice">
        </div>

        <div class="form-group col-md-6">
          <label for="unit_price">Unit Price</label>
          <input type="number" class="form-control form-control-sm" placeholder="Unit Price" v-model="unit_price" @input="calculateTotalPrice">
        </div>
      </div>

      <div class="form-group">
        <label for="price">Total Price</label>
        <input type="text" class="form-control form-control-sm" placeholder="Total Price" v-model="price" disabled>
      </div>

      <button type="submit" class="btn btn-primary btn-sm">Submit</button>
    </form>
  </div>
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
    calculateTotalPrice() {
      if (this.stock && this.unit_price) {
        this.price = (parseInt(this.stock) * parseInt(this.unit_price)).toString();
      } else {
        this.price = "";
      }
    },
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

        this.category_id = "";
        this.size_id = "";
        this.image = null;
        this.prod_name = "";
        this.stock = "";
        this.price = "";
        this.unit_price = "";

        this.refreshData();
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
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    async fetchCategories() {
      try {
        const response = await axios.get("getcat");
        this.categories = response.data; // Assuming response.data contains the categories array
      } catch (error) {
        console.error(error);
      }
    },
    async fetchsizes() {
      try {
        const response = await axios.get("getsize");
        this.sizes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchsizes();
  },
};
</script>

<style scoped>
/* Your component's specific styles if needed */
</style>
