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

    form{
      text-align:center;  
      background-color:white;
      border-radius:10px;
    }

    form ul{
        -webkit-padding-start: 0px;
    }

    form h1{
        color:rgba(66, 48, 40, .90);
        margin-top:20px;
        margin-bottom:20px;
    }

    form li {
        display: block;
        padding: 5px;
    }

    form input{
        width: 95%;
    }
    form textarea{
        width: 95%;
    }

    form button{
        width: 95%;
        background: #ED5C68;
        border:none;
        border-width:0px;
        color: white;
        padding:8px;
        margin-bottom:20px;
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

    div#quiz th{
        font-size: 40px;
        font-family: 'Merienda', cursive;
        width:25%;
    }

    div#quiz table {
        width:100%;
        height:100%;
    }

    div#quiz button{
        width:100%;
        height:250px;
        font-size:40px;
        font-weight:bold;
        border:none;
        border-width:0px;
        background:#FFFFFF;
    }

    div#quiz button:hover{
        background: rgba(255, 215, 201, 1);
    }


    div#quiz h1 {
        text-align:center;
    }

    div#quiz tr {
        text-align:center;
    }

    div#quiz td {
        font-size: 20px;
    }
</style>
