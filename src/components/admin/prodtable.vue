<template>
  <div class="clearfix"></div>
  <div class="row" style="margin-left: 300px; margin-right: 20px;">
    <div class="col-md-12 col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>List of Products</h2>
          <div class="clearfix"></div>
        </div>
     <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- Your table structure -->
            <insert @data-saved="getInfo" />
            <div class="table-responsive">
              <table id="datatable-responsive" class="table table-bordered table-striped table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Category</th>
                    <th>Item Image</th>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Unit Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in info" :key="product.id">
                    <td>{{ getCategoryName(product.category_id) }}</td>
                    <td><img :src="product.image_path" alt="Product Image" class="img-fluid"></td>
                    <td>{{ product.prod_name }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ getSizeName(product.size_id) }}</td>
                    <td>{{ product.unit_price }}</td>
                    <td>
                      <a href="#" data-id="1" class="btn btn-outline-primary btn-sm edit"><i class="fa fa-edit"></i> EDIT</a>
                      <button class="btn btn-outline-danger btn-sm" @click="deleteRecord(product.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      info: [],
      categories: [],
      sizes: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
    deleteRecord(id) {
      // Implement delete logic
    },
    openModal() {
      // Implement openModal logic
    },
    // Other methods...
  },
};
</script>
<style>
/* Additional or modified CSS styles for the table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  text-align: left;
}

.table thead th {
  background-color: #333;
  color: white;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-responsive {
  overflow-x: auto;
}</style>