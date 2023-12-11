<template>
    <div>
      <h1>Event Calendar</h1>
      <datepicker v-model="selectedDate" format="yyyy-MM-dd"></datepicker>
  
      <div class="calendar">
        <div v-for="day in daysInMonth" :key="day">
          <div class="day">{{ day }}</div>
          <div class="events">
            <!-- Display events for each day -->
            <div v-for="event in getEventsForDay(day)" :key="event.id" class="event">
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Datepicker from 'vuejs-datepicker';
  
  export default {
    components: {
      Datepicker,
    },
    data() {
      return {
        selectedDate: new Date(),
        events: [
          // Replace this array with your actual events data
          { id: 1, title: 'Event 1', date: '2023-12-15' },
          { id: 2, title: 'Event 2', date: '2023-12-20' },
          // Add more events as needed
        ],
      };
    },
    computed: {
      daysInMonth() {
        const date = new Date(this.selectedDate);
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, index) => index + 1);
      },
    },
    methods: {
      getEventsForDay(day) {
        const selectedDateString = this.selectedDate.toISOString().substring(0, 10);
        return this.events.filter(event => event.date === `${selectedDateString}-${day}`);
      },
    },
  };
  </script>
  
  <style>
  /* Add your calendar styling here */
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }
  
  .day {
    border: 1px solid #ccc;
    padding: 5px;
  }
  
  .events {
    display: flex;
    flex-direction: column;
  }
  
  .event {
    background-color: #f0f0f0;
    margin-bottom: 5px;
    padding: 2px 5px;
  }
  </style>
  