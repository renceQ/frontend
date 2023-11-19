<template>
    <div class="clearfix"></div>
    <div class="row" style="margin-left: 300px; margin-right: 20px;">
      <div class="col-md-12 col-sm-12">
        <div class="neumorphic-container">
          <div class="neumorphic-header">
            <h2>Approved Events</h2>
            <ul class="neumorphic-toolbar">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                </div>
              </li>
              <li><a class="close-link"><i class="fa fa-close"></i></a></li>
            </ul>
            <div class="clearfix"></div>
          </div>
  
          <div class="neumorphic-content">
            <div class="row">
              <div class="col-sm-12">
                <div class="neumorphic-table">
                  <insert @data-saved="geteventinfo" />
                  <table class="table table-bordered table-striped neumorphic-table-style">
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th>Event Description</th>
                        <th>Contact Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Approved</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="event in info" :key="event.id">

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
    };
  },
  created() {
    this.geteventinfo();
  },
  methods: {
    async geteventinfo() {
      try {
        const response = await axios.get('getevent');
        this.info = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    
    
    // Other methods...
  },
};
</script>