<template>
    <div class="clearfix"></div>
    <div class="row" style="margin-left: 300px; margin-right: 20px;">
      <div class="col-md-12 col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>List of Category</h2>
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
                        <th>ID</th>
                        <th>CATEGORY</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="info in info">
                        <td>{{ info.id}}</td>
                        <td>{{ info.category_name}}</td>
                        <td>
                          <button @click="editRecord" class="btn btn-success btn-sm edit"> EDIT</button>
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

<div>
      <form @submit.prevent="savecateg">
        <label for="category_name">Category</label>
        <input type="text" placeholder="category_name" v-model="category_name" required>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>


</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      category_name:"", 
      info: [],
 
    }
  },
  created() {
    this.getInfo();
  },
  methods: {

    async savecateg() {
      try {
        const ins = await axios.post("savecateg", {
          category_name: this.category_name,
        });

        this.category_name ="";
        this.$emit('data-saved');
        this.getInfo();

        $('successModal').modal('show');
      } catch (error) {
        console.error(error);
      }
    },

    async getInfo() {
      try {
        const response = await axios.get('getcat');
        this.info = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    deleteRecord(categoryId) {
      console.log(`Deleting category with ID: ${categoryId}`);
      // Implement delete logic here
    }
  }
};
</script>

<style>


</style>