<template>
    <v-container style="width: 1000px; margin-left: 330px;">
      <!-- Pending Orders table -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Pending Orders</v-card-title>
            <!-- Replace with your insert component -->
            <insert @data-saved="getOrder" />
            <v-data-table 
              :headers="headers"
              :items="pendingOrders"
              item-key="id"
            >
              <template v-slot:[`item.image`]="{ item }">
                <img :src="item.image" alt="Product Image" width="50" height="50">
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn @click="approveEvent(item.id)" color="success" small>
                  Approve
                </v-btn>
                <v-btn @click="denyEvent(item.id)" color="error" small>
                  Deny
                </v-btn>
              </template>
              <template v-for="(header, index) in headers" v-slot:[`header.${header.value}`]="{ props }">
                <th :key="index">
                  <span>{{ getHeaderTitle(header.value) }}</span>
                </th>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Approved Orders table -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Approved Orders</v-card-title>
            <v-data-table
              :headers="headers"
              :items="approvedOrders"
              item-key="id"
            >
              <template v-slot:[`item.image`]="{ item }">
                <img :src="item.image" alt="Product Image" width="50" height="50">
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn @click="approveEvent(item.id)" color="success" small disabled>
                  Approved
                </v-btn>
              </template>
              <template v-for="(header, index) in headers" v-slot:[`header.${header.value}`]="{ props }">
                <th :key="index">
                  <span>{{ getHeaderTitle(header.value) }}</span>
                </th>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Declined Orders table -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Declined Orders</v-card-title>
            <v-data-table
              :headers="headers"
              :items="declinedOrders"
              item-key="id"
            >
              <template v-slot:[`item.image`]="{ item }">
                <img :src="item.image" alt="Product Image" width="50" height="50">
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn @click="denyEvent(item.id)" color="error" small disabled>
                  Denied
                </v-btn>
              </template>
              <template v-for="(header, index) in headers" v-slot:[`header.${header.value}`]="{ props }">
                <th :key="index">
                  <span>{{ getHeaderTitle(header.value) }}</span>
                </th>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'; // Import axios library
  
  export default {
    data() {
      return {
        headers: [
          { text: 'Image', value: 'image' },
          { text: 'Product Name', value: 'prod_name' },
          { text: 'Unit Price', value: 'unit_price' },
          { text: 'Size ID', value: 'size_id' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Address', value: 'address' },
          { text: 'Contact', value: 'contact' },
          { text: 'Other Info', value: 'other_info' },
          { text: 'Customer Name', value: 'customerName' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        infos: [] // Initialize infos as an empty array
      };
    },
    created() {
      this.getOrder();
    },
    computed: {
      pendingOrders() {
        return this.infos.filter(order => order.status !== 'approve' && order.status !== 'deny');
      },
      approvedOrders() {
        return this.infos.filter(order => order.status === 'approve');
      },
      declinedOrders() {
        return this.infos.filter(order => order.status === 'deny');
      }
    },
    methods: {
      async getOrder() {
        try {
          const response = await axios.get('getOrder');
          this.infos = response.data; // Update this.infos instead of this.info
        } catch (error) {
          console.error(error);
        }
      },
      approveEvent(id) {
        // Logic to handle event approval
      },
      denyEvent(id) {
        // Logic to handle event denial
      },
      getHeaderTitle(field) {
        const headerTitles = {
          image: 'Image',
          prod_name: 'Product Name',
          unit_price: 'Unit Price',
          size_id: 'Size ID',
          quantity: 'Quantity',
          address: 'Address',
          contact: 'Contact',
          other_info: 'Other Info',
          customerName: 'Customer Name',
          status: 'Status',
          actions: 'Actions',
          // Add other field titles accordingly
        };
        return headerTitles[field] || '';
      },
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  .container {
    width: 1000px;
    margin-left: 330px;
  }
  
  .card {
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .card-header {
    background-color: #f5f5f5;
    font-weight: bold;
    padding: 10px;
  }
  
  .table img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .btn {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  </style>
  