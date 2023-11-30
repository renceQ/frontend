
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
    component: admin,
    meta: { requiresAuth: true } 
  },
  {
    path: '/about',
    component: aboutpage,
    meta: { requiresAuth: true } 
  },
  {
    path: '/contacts',
    component: contactus,
    meta: { requiresAuth: true } 
  },
  {
    path: '/request/table',
    component: requesttable,
    meta: { requiresAuth: true } 
  },
  {
    path: '/home',
    component: homeuser,
    meta: { requiresAuth: true } 
  }, 
  {
    path: '/userservices',
    component: userServices,
    meta: { requiresAuth: true } 
  },
  {
    path: '/userproducts',
    component: userproducts,
    meta: { requiresAuth: true } 
  },
  {
    path: '/productstable',
    component: productstable,
    meta: { requiresAuth: true } 
  },
  {
    path: '/productcategory',
    component: productcategory,
    meta: { requiresAuth: true } 
  },
  {
    path: '/bookevents',
    component: bookevents,
    meta: { requiresAuth: true } 
  },
  {
    path: '/userblog',
    component: userblog,
    meta: { requiresAuth: true } 
  },
  {
    path: '/bookingtable',
    component: bookingtable,
    meta: { requiresAuth: true } 
  },
  {
    path: '/approved_events',
    component: approved_events,
    meta: { requiresAuth: true } 
  },
  {
    path: '/productrequest/:image/:prod_name/:unit_price',
    name: 'productrequest',
    component: () => import('../views/productrequest.vue'), // Replace with your actual path and component
    props: true, // Pass route params as props to the component
    meta: { requiresAuth: true } 
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');

  // List of routes that require authentication
  const protectedRoutes = [
    '/admin',
    '/bookingtable',
    '/productcategory'
    // Add other routes here as needed
  ];

  if (!token) {
    // If there's no token, redirect to login for all routes except '/' and '/register'
    if (to.path !== '/' && to.path !== '/register') {
      localStorage.clear(); // Clear local storage if no token and accessing unauthorized route
      next('/');
    } else {
      next();
    }
  } else {
    // If there's a token
    if (to.path === '/' || to.path === '/register') {
      // If trying to access login or register page with token, redirect to home
      next('/home');
    } else {
      if (protectedRoutes.includes(to.path)) {
        // For protected routes
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (!isAdmin) {
          // If not an admin, clear storage and redirect to login
          localStorage.clear();
          next('/');
        } else {
          // If an admin, proceed to the route
          next();
        }
      } else {
        // For routes that don't require authentication
        next();
      }
    }
  }
});


// kulang pa security : if the url was copied in other site redirect to login

// next task get user data

export default router;