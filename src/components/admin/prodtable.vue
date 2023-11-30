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
                    <th>Status</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Unit Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in paginatedData" :key="product.id">
                    <td>{{ getCategoryName(product.category_id) }}</td>
                    <td v-if="product.image">
                      <img :src="product.image" alt="image" class="img-fluid" style="max-width: 100px; max-height:100px;">
                    </td>
                    <td>{{ product.prod_name }}</td>
                    <td>
                      <!-- Status field based on stock value -->
                      <span v-if="product.stock <= 15" class="text-danger">Low Stock</span>
                      <span v-else class="text-success">High Stock</span>
                    </td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ getSizeName(product.size_id) }}</td>
                    <td>{{ product.unit_price }}</td>
                    <td>
                      <a href="#" data-id="1" class="btn btn-outline-primary btn-sm edit"><i class="fa fa-edit"></i> EDIT</a>
                    </td>
                  </tr>
                </tbody>
                
              </table>
            </div>
            <div class="text-center mt-3">
              <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-outline-primary mr-2">
                <i class="fa fa-chevron-left"></i>
              </button>
              <span>{{ currentPage }}</span>
              <button @click="nextPage" :disabled="currentPage * pageSize >= info.length" class="btn btn-outline-primary ml-2">
                <i class="fa fa-chevron-right"></i>
              </button>
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
      pageSize: 10, // Number of items per page
      currentPage: 1, // Current page number
    };
  },
  created() {
    this.getData();
    this.getInfo();
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
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      const maxPage = Math.ceil(this.info.length / this.pageSize);
      if (this.currentPage < maxPage) {
        this.currentPage++;
      }
    },
  },
    computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.info.slice(startIndex, endIndex);
    },
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