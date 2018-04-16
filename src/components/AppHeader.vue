<template>
    <nav>
        <img src="/static/images/scroll-top.png">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/">Study</router-link></li>
            <li class="right" v-if="loggedIn">
                <router-link :to="{ name: 'UserPage', params: {userID: user.id}}">{{user.username}}</router-link> 
                <a @click="logout" href="#">Logout</a></p>
            </li>
            <li class="right" v-else>
                <form v-on:submit.prevent="login">
                  <input v-model="email" placeholder="Email Address">
                  <input v-model="password" type="password" placeholder="Password">
                  <button class="primary" type="submit">Login</button>
                </form>
            </li>
        </ul>
        <div class="flexWrapper errorPlace">
            <p v-if="loginError" class="flexRight error">{{loginError}}</p>
        </div>
        <img src="images/scroll-bottom.png">
    </nav>
</template>

<script>
 export default {
   name: 'AppHeader',
   data () {
     return {
       keywords: '',
       email: '',
       password: '',
     }
   },
   computed: {
     user: function() {
       return this.$store.getters.user;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
     numberFollowing: function() {
       return this.$store.getters.following.length;
     },
     numberFollowers: function() {
       return this.$store.getters.followers.length;
     }
   },
   methods: {
     search: function() {
       this.$router.push({ path: '/search', query: { keywords: this.keywords }})
       this.keywords = '';
     },
     login: function() {
       this.$store.dispatch('login',{
         email: this.email,
         password: this.password,
       }).then(user => {
	 this.email = '';
	 this.password = '';
       });
     },
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
 }
</script>

<style scoped>
    nav {
        display: inline-grid;
    }
    
    nav il a:link{
        color: #30332C;
    }

    nav ul {
        background-image: url("./images/scroll-mid.png");
        background-position: center bottom;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        font-family: 'Alegreya', serif;
    }
    
    nav img{
        padding: 0;
    }

    nav li {
        width: 100%;
        text-align:center;
    }

    nav li a {
        font-family: 'Merienda', cursive;
        font-weight: bold;
        width: 130px;
        display: inline-block;
        color: #30332C;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 18px; 
    }

    nav li a:link {
        color: #30332C;
    }

    nav li a:visited {
        color: #30332C;
    }

    nav li a:hover {
        background-color: #ED5C68;
    }
</style>
