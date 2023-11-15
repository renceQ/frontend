<template>
  <div ref="SchedulerComponent" style="width:900px; margin-left:100px;"></div>
</template>

<script>
import { scheduler } from "dhtmlx-scheduler";
import axios from 'axios';

export default {
  props: {
    events: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    $_initDataProcessor: function() {
      if (!scheduler.$_dataProcessorInitialized) {
        scheduler.createDataProcessor((entity, action, data, id) => {
          this.$emit(`${entity}-updated`, id, action, data);
        });
        scheduler.$_dataProcessorInitialized = true;
      }
    },

    // Fetch events from the backend
    async fetchEventsFromBackend() {
      try {
        const response = await axios.get('http://backend.test/');
        return response.data;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    },

    // Create a new event
    async createEventOnBackend(newEvent) {
      try {
        const response = await axios.post('http://backend.test/', newEvent);
        console.log('Event created:', response.data);
        this.fetchAndParseEvents(); // Refresh the events after creating a new one
      } catch (error) {
        console.error('Error creating event:', error);
      }
    },

    // Update an existing event
    async updateEventOnBackend(updatedEvent) {
      try {
        const response = await axios.put(`http://backend.test/${updatedEvent.id}`, updatedEvent);
        console.log('Event updated:', response.data);
        this.fetchAndParseEvents(); // Refresh the events after updating
      } catch (error) {
        console.error('Error updating event:', error);
      }
    },

    // Delete an event
    async deleteEventOnBackend(eventId) {
      try {
        const response = await axios.delete(`http://backend.test/${eventId}`);
        console.log('Event deleted:', response.data);
        this.fetchAndParseEvents(); // Refresh the events after deleting
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    },

    // Fetch and parse events from the backend
    async fetchAndParseEvents() {
      const events = await this.fetchEventsFromBackend();
      scheduler.clearAll();
      scheduler.parse(events);
    },
  },
  mounted: async function () {
    scheduler.skin = "material";
    scheduler.config.header = [
      "day",
      "week",
      "month",
      "date",
      "prev",
      "today",
      "next",
    ];
    this.$_initDataProcessor();

    scheduler.init(
      this.$refs.SchedulerComponent,
      new Date(2020, 0, 20),
      "week"
    );
    await this.fetchAndParseEvents(); // Fetch and parse events on component mount
  },
};
</script>

<style>
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>
