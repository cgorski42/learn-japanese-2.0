import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Options from '@/components/Options'
//import Quiz from '@/components/Quiz'
import SearchResults from '@/components/SearchResults'
import HashTag from '@/components/HashTag'
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
   /* {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz
    }, */ 
    {
      path: '/search',
      name: 'SearchResults',
      component: SearchResults
    },
    {
      path: '/hashtag/:hashtag',
      name: 'HashTag',
      component: HashTag
    },
    {
      path: '/user/:userID',
      name: 'UserPage',
      component: UserPage
    },
  ]
})
