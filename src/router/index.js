import { createRouter, createWebHistory } from 'vue-router'
import admin from '../views/admin.vue'
import user from '../views/user.vue'
import aboutpage from '../views/aboutpage.vue'
import contactus from '../views/contactus.vue'
import requesttable from '../views/requesttable.vue'
import homeuser from '../views/homeuser.vue'
import userServices from '../views/userServices.vue'
import userproducts from '../views/userproducts.vue'
import productstable from '../views/productstable.vue'

const routes = [
  {
    path: '/admin',
    component: admin
  },
  {
    path: '/',
    component: user
  },
  {
    path: '/about',
    component: aboutpage
  },
  {
    path: '/contacts',
    component: contactus
  },
  {
    path: '/request/table',
    component: requesttable
  },
  {
    path: '/userhome',
    component: homeuser
  }, 
  {
    path: '/userservices',
    component: userServices
  },
  {
    path: '/userproducts',
    component: userproducts
  },
  {
    path: '/productstable',
    component: productstable
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
