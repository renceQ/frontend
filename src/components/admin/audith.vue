<template>
    <div class="table-container">
        <insert @data-saved="getaudith" />
        <table class="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Unit Price</th>
            <th>Size ID</th>
            <th>UPC</th>
            <th>Barcode Image</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Product Description</th>
            <th>Type</th>
            <th>Current Stock</th>
            <th>Old Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td v-if="product.image">
                <img :src="product.image" alt="image" class="img-fluid" style="max-width: 100px; max-height:100px;">
              </td>
            <td>{{ getCategoryName(product.category_id) }}</td>
            <td>{{ product.prod_name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.unit_price }}</td>
            <td>{{ getSizeName(product.size_id) }}</td>
            <td>{{ product.UPC }}</td>
            <td>{{ product.barcode_image }}</td>
            <td>{{ product.created_at }}</td>
            <td>{{ product.updated_at }}</td>
            <td>{{ product.product_description }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.old_stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script>
import axios from 'axios'

export default {
  data() {
    return {
        id: "",
        image: null,
        category_id: "",
        prod_name: "",
        stock: "",
        price: "",
        unit_price: "",
        size_id: "",
        UPC: "",
        barcode_image: null,
        created_at: "",
        updated_at: "",
        product_description: "",
        type: "",
        old_stock:"",
      products: [],
      categories: [],
      sizes: [],
      }
  },
  created() {
    this.getaudith();
  },
  methods: {

    async getaudith() {
      try {
        const response = await axios.get('getaudith');
        this.products = response.data;
      } catch (error) {
        console.error(error);
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
    },async fetchCategories() {
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
  
<style>
/* Add styles to the table container */
.table-container {
  width: 1000px;
  margin-right: 40px;
  font-size: 12px; /* Adjust the font size as needed */
}

/* Add styles to the table */
.product-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 6px; /* Adjust cell padding */
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.product-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-table tbody tr:hover {
  background-color: #e9e9e9;
}

/* Align the table to the right */
@media (min-width: 768px) {
  .table-container {
    float: right;
    margin-left: 20px; /* Adjust margin as needed */
  }
}
</style>