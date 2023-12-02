<template>
  <div class="container">
    <br><br><br><br><br><br><br>
    <h1 class="text-center" style="font-size: 50px;">Available <span>Products...</span></h1>
    <br><br>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <label for="category_id" class="label text-center">Category</label>
        <div class="select-wrapper" style="margin-left:180px;" >
          <select v-model="category_id" @change="filterProducts" class="select">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.category_name }}
            </option>
          </select>
          <i class="fas fa-caret-down arrow-icon"></i>
        </div>
      </div>
    </div>
    <br>

    <!-- Show products -->
    <div class="row justify-content-center">
      <div v-for="(product, index) in info" :key="product.id" class="col-lg-3 col-md-6 mb-4">
        <!-- Product Card -->
        <div class="room-item text-center">
          <img :src="product.image" alt="" style="width: 180px; height: 180px;">
          <div class="ri-text">
            <h4>{{ product.prod_name }}</h4>
            <p>Unit Price: {{ product.unit_price }}</p>
            <p>Available Size: {{ getSizeName(product.size_id) }}</p>
            <button class="btn btn-outline-danger btn-sm" @click="preOrder(product)">Pre order</button>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Footer Section -->
    <footer class="ftco-footer ftco-bg-dark ftco-section mt-5">
      <!-- Your footer content -->
    </footer>
</template>

<!-- Your existing script and style sections remain unchanged -->



 <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {  
        categories: [], 
        info: [],
      sizes: [],
      category_id: '',
      size_id: '',
      };
    },
    created() {
    this.getData();
  },
    methods: {
   
      preOrder(product) {
  const { image, prod_name, unit_price, size_id, stock } = product;
  this.$router.push({
    name: 'productrequest',
    params: {
      image,
      prod_name,
      unit_price,
      size_id,
      stock // Include stock parameter
    }
  });
},


      
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