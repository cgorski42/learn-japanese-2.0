<template>
  <div>
    <h2> {{userView.name}} ({{userView.username}}) </h2>
    <p>Score: (Insert user score here...)</p>
  </div>
</template>

<script>
 import FeedList from './FeedList';
 import UserList from './UserList';
 export default {
   name: 'UserPage',
   components: { FeedList, UserList },
   created: function() {
     this.$store.dispatch('getUser',{id:this.$route.params.userID});
   },
   computed: {
     user: function() {
       return this.$store.getters.user;
     },
     userView: function() {
       return this.$store.getters.userView;
     },
   },
   watch: {
     '$route.params.userID'() {
       this.$store.dispatch('getUser',{id:this.$route.params.userID});
     }
   },
 }
</script>
