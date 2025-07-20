import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '@/views/FavoriteView.vue'
import RecipeView from '@/views/RecipeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AddRecipe from '@/views/AddRecipe.vue'
import EditRecipe from '@/views/EditRecipe.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoriteView
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: AddRecipe
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeView
    },
    {
      path: '/recipe/edit/:id',
      name: 'edit',
      component: EditRecipe
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
