<template>
  <div id="app">
    <section>
        <aside><app-header/></aside>
        <article><router-view/></article>
    </section>
  </div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 export default {
   name: 'App',
   components: { AppHeader }
 }
</script>

<style>
    jap{
        font-family: 'hakusyukaisyoextrabold_kkRg';
    }

    h1{
        font-size: 40px;
        font-family: 'Merienda', cursive;
    }

    li {
        display: block
    }

    /* unvisited link */
    a:link {
        color: #ED5C68;
    }

    /* visited link */
    a:visited {
        color: #69A561;
    }

    body{
        background: url("/static/images/cherry-blossoms.jpg");
        /*background-size: cover;*/
        background-position: top left;
        background-repeat: no-repeat;
        background-color:#ffffff;
        font-family: 'Alegreya', serif;
        color: white;
        font-size: 15px; 
    }
    section {
     display: flex;
    }

    aside {
        flex: .75;
    }

    article {
        flex: 4.25;
        padding: 20px;
        background: rgba(66, 48, 40, .90);
        border-radius:10px;
        margin:10px;
        margin-top:19px;
        margin-left:19px;
    }

    footer{
        /*background-color: #EA8567;*/
        padding: 30px;
        text-align: center;
        color: black;
    }

    footer img{
        width:10%;
        background:white;
        border-radius:15px;
        padding:10px;
    }
    footer img:hover {
        background:#ED5C68;
    }
</style>
