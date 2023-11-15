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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="info in info">
                        <td>{{ getCategoryName(info.category_id) }}</td>
                        <td>{{ info.image_path}}</td>
                        <td>{{ info.prod_name}}</td>
                        <td>{{ info.stock}}</td>
                        <td>{{ info.price}}</td>
                        <td>
                          <a href="#" data-id="1" class="btn btn-success btn-sm edit"><i class="fa fa-edit"></i> EDIT</a>
                          <button class="btn btn-danger btn-sm" @click="deleteRecord(info.id)">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="modal" v-if="isModalOpen">
            <div class="modal-content">
              <!-- Modal content -->
              <span class="close" @click="closeModal">&times;</span>
              <p>Add Product Modal</p>
              <!-- Other modal content -->
            </div>
          </div>
      
          
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      info: [],
      categories: [], // Placeholder for categories array
      isModalOpen: false
    }
  },
  created() {
    this.getInfo();
    // Fetch categories here or initialize this.categories with the required data
    this.getCategories();
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async getInfo() {
      try {
        const inf = await axios.get('getDatas');
        this.info = inf.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const response = await axios.get('getcat'); // Replace 'getCategories' with your actual API endpoint for fetching categories
        this.categories = response.data; // Assuming response.data contains the categories array from the API
      } catch (error) {
        console.log(error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(category => category.id === categoryId);
      return category ? category.category_name : 'Unknown';
    },
    deleteRecord(id) {
      // Your deleteRecord method logic
    },
    // Other methods...
  },
}
</script>


<style>
.modal {
  display: none; /* Hide the modal by default */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>