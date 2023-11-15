<template>
    <div id="app">
      <Menu />
      <prodtable /><br><br><br>

      <insertprod />
    </div>
  
  </template>
  
  <script>
  import Menu from '../components/admin/Menu.vue'
  import prodtable from '../components/admin/prodtable.vue'
  import insertprod from '../components/admin/insertprod.vue'
  
  export default {
    name: "app",
    components: {
      Menu,
      prodtable,
      insertprod,
    },
}
   </script>
   <style>

  </style>
  