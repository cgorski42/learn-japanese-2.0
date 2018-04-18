<template>
  <div>
    <div v-if="loggedIn">
      <options/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import Options from './Options';
 export default {
   name: 'HomePage',
   components: {WelcomePage,Options},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
