<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="showPendingtable" class="custom-data-table">
          <v-card-title>
            <h2>List of Event Requests</h2>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Settings 1</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Settings 2</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="tableHeaders"
              :items="pendingRequests"
              item-key="event_title"
              :items-per-page="10"
            >
              <template v-slot:[`item.event_title`]="{ item }">
                {{ item.event_title }}
              </template>
              <template v-slot:[`item.start_date`]="{ item }">
                {{ item.start_date }}
              </template>
              <template v-slot:[`item.end_date`]="{ item }">
                {{ item.end_date }}
              </template>
              <template v-slot:[`item.location`]="{ item }">
                {{ item.location }}
              </template>
              <template v-slot:[`item.event_description`]="{ item }">
                {{ item.event_description }}
              </template>
              <template v-slot:[`item.name`]="{ item }">
                {{ item.name }}
              </template>
              <template v-slot:[`item.email`]="{ item }">
                {{ item.email }}
              </template>
              <template v-slot:[`item.phone`]="{ item }">
                {{ item.phone }}
              </template>
              <template v-slot:[`item.service`]="{ item }">
                {{ item.service }}
              </template>
              <template v-slot:[`item.status`]="{ item }">
                {{ item.status }}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn small color="success" @click="viewEvent(item)">
                  <v-icon>mdi-eye</v-icon>
                  View
                </v-btn>
                <!-- Add other action buttons here -->
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>


   <!-- Approved Request Table -->
   <v-col cols="12" style="margin-left: 90px;">
   <v-card v-if="showApprovedTable" class="custom-data-table">
    <v-card-title>
      <h2>Approved Requests</h2>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="tableHeaders"
        :items="approvedRequests"
        item-key="event_title"
        :items-per-page="10"
      >
        
      <template v-slot:[`item.event_title`]="{ item }">
        {{ item.event_title }}
      </template>
      <template v-slot:[`item.start_date`]="{ item }">
        {{ item.start_date }}
      </template>
      <template v-slot:[`item.end_date`]="{ item }">
        {{ item.end_date }}
      </template>
      <template v-slot:[`item.location`]="{ item }">
        {{ item.location }}
      </template>
      <template v-slot:[`item.event_description`]="{ item }">
        {{ item.event_description }}
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:[`item.email`]="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        {{ item.phone }}
      </template>
      <template v-slot:[`item.service`]="{ item }">
        {{ item.service }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ item.status }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="success" @click="viewEvent(item)">
          <v-icon>mdi-eye</v-icon>
          View
        </v-btn>
        <!-- Add other action buttons here -->
      </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</v-col>


  <!-- Declined Request Table -->
  <v-col cols="12" style="margin-left: 90px;">
  <v-card v-if="showDeclinedTable" class="custom-data-table">
    <v-card-title>
      <h2>Declined Requests</h2>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="tableHeaders"
        :items="declinedRequests"
        item-key="event_title"
        :items-per-page="10"
      >
       
      <template v-slot:[`item.event_title`]="{ item }">
        {{ item.event_title }}
      </template>
      <template v-slot:[`item.start_date`]="{ item }">
        {{ item.start_date }}
      </template>
      <template v-slot:[`item.end_date`]="{ item }">
        {{ item.end_date }}
      </template>
      <template v-slot:[`item.location`]="{ item }">
        {{ item.location }}
      </template>
      <template v-slot:[`item.event_description`]="{ item }">
        {{ item.event_description }}
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:[`item.email`]="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        {{ item.phone }}
      </template>
      <template v-slot:[`item.service`]="{ item }">
        {{ item.service }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ item.status }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="success" @click="viewEvent(item)">
          <v-icon>mdi-eye</v-icon>
          View
        </v-btn>
        <!-- Add other action buttons here -->
      </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</v-col>
 
  <v-dialog v-model="showModal" max-width="800px">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ selectedEvent.event_title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- Neumorphic Approve Button -->
        <v-btn text color="white" @click="approveEvent">Approve</v-btn>
        <v-btn text color="white" @click="declineEvent">Decline</v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-row v-for="(value, key) in selectedEvent" :key="key">
                <v-col cols="12">
                  <span>{{ formatLabel(key) }}:</span>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="selectedEvent[key]" readonly outlined></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>


</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: false,
      selectedEvent: {}, // Holds the selected event details
      info: [],
      tableHeaders: [
        { text: 'Event', value: 'event_title' },
        { text: 'Start Date', value: 'start_date' },
        { text: 'End Date', value: 'end_date' },
        { text: 'Location', value: 'location' },
        { text: 'Event Description', value: 'event_description' },
        { text: 'Contact Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Type of Service', value: 'service' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    pendingRequests() {
        return this.info.filter(item => item.status !== 'approved' && item.status !== 'declined');
      },
    approvedRequests() {
      return this.info.filter(item => item.status === 'approved');
    },
    declinedRequests() {
      return this.info.filter(item => item.status === 'declined');
    },
    showPendingtable() {
      return this.pendingRequests.length > 0;
    },
    showApprovedTable() {
      return this.approvedRequests.length > 0;
    },
    showDeclinedTable() {
      return this.declinedRequests.length > 0;
    },
  },
  created() {
    this.getEventInfo();
  },
  methods: {
    async approveEvent() {
    try {
      const response = await axios.post('/updateEventStatus', {
        id: this.selectedEvent.id,
        status: 'approved'
      });

      if (response.status === 200) {
        // Update the status in the selectedEvent object
        this.showModal = false; // Close the modal after approval
        this.selectedEvent.status = 'approved';
        this.getEventInfo();

        // Find the index of the updated event in the info array and update it
        const index = this.info.findIndex(event => event.id === this.selectedEvent.id);
        if (index !== -1) {
          this.$set(this.info, index, { ...this.selectedEvent });
        }

        this.showModal = false; // Close the modal
      } else {
        console.error('Error updating event status');
      }
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  },

  async declineEvent() {
    try {
      const response = await axios.post('/updateEventStatus', {
        id: this.selectedEvent.id,
        status: 'declined'
      });

      if (response.status === 200) {
        // Update the status in the selectedEvent object
        this.selectedEvent.status = 'declined';
        this.getEventInfo();
        this.showModal = false; // Close the modal after approval
        // Find the index of the updated event in the info array and update it
        const index = this.info.findIndex(event => event.id === this.selectedEvent.id);
        if (index !== -1) {
          this.$set(this.info, index, { ...this.selectedEvent });
        }

        this.showModal = false; // Close the modal
      } else {
        console.error('Error updating event status');
      }
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  },

    viewEvent(item) {
      // Set the selected event when "View" button is clicked
      this.selectedEvent = { ...item }; // Copy the item details to selectedEvent
      this.showModal = true; // Open the modal
    },
    closeModal() {
      this.showModal = false; // Close the modal
    },
    formatLabel(key) {
      // Convert camelCase to Title Case for labels
      return key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
    },
    async getEventInfo() {
      try {
        const response = await axios.get('getevent');
        this.info = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
/* Add your custom styles here */
/* For example, adjust the modal styles */
.v-dialog--width {
  max-width: 800px !important;
}

/* Remove the border */
.v-text-field {
  border: none !important;
}

.custom-data-table {
  width: 1000px; /* Set the width for the tables */
  margin-left: 200px;
}

/* Ensure table cells have consistent width */
.custom-table .v-data-table__wrapper {
  width: 100%;
}

.custom-table .v-data-table__wrapper table {
  width: 100%;
}
</style>