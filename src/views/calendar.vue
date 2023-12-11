<template>
  <v-layout wrap>
    <v-flex xs12 class="mb-3">
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
          :events="formattedEvents"
        ></v-calendar>
      </v-sheet>
    </v-flex>
    <!-- Other components or controls -->
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        // Your type options...
      ],
      events: [], // Store fetched events here
    };
  },
  computed: {
    formattedEvents() {
      // Filter and format approved events for the calendar
      return this.approvedRequests.map(event => ({
        name: event.event_title,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        color: 'green', // Set a color for approved events
      }));
    },
    approvedRequests() {
      // Assuming you have stored the approved events in a computed property
      return this.events.filter(event => event.status === 'approved');
    },
    // Other computed properties...
  },
  created() {
    this.getEventInfo();
  },
  methods: {
    async getEventInfo() {
      try {
        const response = await axios.get('/getevent');
        this.events = response.data; // Store fetched events
      } catch (error) {
        console.error(error);
      }
    },
    // Other methods...
  },
};
</script>
