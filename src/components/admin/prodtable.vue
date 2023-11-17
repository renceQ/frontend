<template>
  <div class="clearfix"></div>
  <div class="row" style="margin-left: 300px; margin-right: 20px;">
    <div class="col-md-12 col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>List of Products</h2>
          <button class="btn btn-primary" @click="openModal">Add Product</button>
          <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Settings 1</a>
                <a class="dropdown-item" href="#">Settings 2</a>
              </div>
            </li>
            <li><a class="close-link"><i class="fa fa-close"></i></a></li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="x_content">
          <div class="row">
            <div class="col-sm-12">
              <div class="card-box table-responsive">
                <insert @data-saved="getInfo" />
                <table id="datatable-responsive" class="table table-bordered table-striped dt-responsive nowrap" cellspacing="0" width="80%" style="margin: 0 auto;">
                  <thead>
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
                      <td>{{ product.image_path }}</td>
                      <td>{{ product.prod_name }}</td>
                      <td>{{ product.stock }}</td>
                      <td>{{ product.price }}</td>
                      <td>{{ getSizeName(product.size_id) }}</td>
                      <td>{{ product.unit_price }}</td>
                      <td>
                        <a href="#" data-id="1" class="btn btn-success btn-sm edit"><i class="fa fa-edit"></i> EDIT</a>
                        <button class="btn btn-danger btn-sm" @click="deleteRecord(product.id)">Delete</button>
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
/* Add any necessary styles here */
</style>
