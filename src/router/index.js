
import { createRouter, createWebHistory } from 'vue-router'
import admin from '../views/admin.vue'
import aboutpage from '../views/aboutpage.vue'
import contactus from '../views/contactus.vue'
import requesttable from '../views/requesttable.vue'
import homeuser from '../views/homeuser.vue'
import userServices from '../views/userServices.vue'
import userproducts from '../views/userproducts.vue'
import productstable from '../views/productstable.vue'
import productcategory from '../views/productcategory.vue'
import bookevents from '../views/bookevents.vue'
import bookingtable from '../views/bookingtable.vue'
import approved_events from '../views/approved_events.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import userblog from '../views/userblog.vue'
import productrequest from '../views/productrequest.vue'
import forgotpass from '../views/forgotpass.vue'
import audith_table from '../views/audith_table.vue'



const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/admin',
    component: admin
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
    path: '/home',
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
  {
    path: '/productcategory',
    component: productcategory
  },
  {
    path: '/bookevents',
    component: bookevents
  },
  {
    path: '/userblog',
    component: userblog
  },
  {
    path: '/bookingtable',
    component: bookingtable
  },
  {
    path: '/approved_events',
    component: approved_events
  },
  {
    path: '/forgotpass',
    component: forgotpass
  },
  {
    path: '/productrequest/:image/:prod_name/:unit_price/:size_id/:stock',
    name: 'productrequest',
    component: () => import('../views/productrequest.vue'), // Replace with your actual path and component
    props: true // Pass route params as props to the component
  },
  {
    path: '/audith_table/:productId', // Define a dynamic segment for the product ID
    name: 'AudithTable', // Optionally, provide a name for the route
    component: audith_table
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('jwt');

  if (to.path !== '/' && to.path !== '/register' && to.path !== '/forgotpass') {
    if (!token) {
      next('/');
    } else {
      // Check if the user is trying to access the admin route
      if (to.path === '/admin'  || to.path === '/bookingtable' || to.path === '/productcategory' || to.path === '/audith_table') { //di pa tapos mag add ng path that was not accessible by the non-admin users
        // Check if the user's credentials match the admin's credentials
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

        if (!isAdmin) {
          // Clear session and redirect to '/login' for non-admin users accessing '/admin'
          sessionStorage.clear();
          next('/login');
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else {
    if (token && (to.path === '/' || to.path === '/register')) {
      next('/home');
    } else {
      next();
    }
  }
});




export default router
