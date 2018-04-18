import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Options from '@/components/Options'
import Quiz from '@/components/Quiz'
import UserPage from '@/components/UserPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/options',
      name: 'Options',
      component: Options
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz
    },  
    {
      path: '/user/:userID',
      name: 'UserPage',
      component: UserPage
    },
  ]
})
