<template>
    <div class="clearfix"></div>
    <div class="row" style="margin-left: 300px; margin-right: 20px;">
      <div class="col-md-12 col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>List of Event Request</h2>
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
                    <insert @data-saved="geteventinfo" />
                  <table id="datatable-responsive" class="table table-bordered table-striped dt-responsive nowrap" cellspacing="0" width="80%" style="margin: 0 auto;">
                    <thead>
                      <tr>
                        <th>Event </th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th>Event_Description</th>
                        <th>Contact Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="info in info">
                        <td>{{ info.event_title}}</td>
                        <td>{{ info.start_date}}</td>
                        <td>{{ info.end_date}}</td>
                        <td>{{ info.location}}</td>
                        <td>{{ info.event_description}}</td>
                        <td>{{ info.name}}</td>
                        <td>{{ info.email}}</td>
                        <td>{{ info.phone}}</td>
                        <td> 
                          <a href="#" data-id="1" class="btn btn-success btn-sm approve"><i class="fa fa-approve"></i> Approve</a>
                          <a href="#" data-id="1" class="btn btn-danger btn-sm deny"><i class="fa fa-deny"></i> Deny</a>
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