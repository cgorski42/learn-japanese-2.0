<template>
<div>
    <table>
    <tr>
        <th v-cloak>{{question}}</th>
        <td>
            <table>
            <tr>
                <td><button v-on:click="checkAnswer(0)" v-cloak> {{options[0]}} </button></td>
                <td><button v-on:click="checkAnswer(1)" v-cloak> {{options[1]}} </button></td>
            </tr>
            <tr> 
                <td><button v-on:click="checkAnswer(2)" v-cloak> {{options[2]}} </button></td>
                <td><button v-on:click="checkAnswer(3)" v-cloak> {{options[3]}} </button></td>
            </tr>
            </table>
        </td>
    </tr>
    </table>
</div>
</template>

<script>
var AlphaEnum = {
  HIRAGANA: 0,
  KATAKANA: 1,
  ROMAJI: 2,
};

export default {
  name: 'Quiz',
  computed: {
    question: function() {
       return this.$store.getters.question;
    },
    options: function() {
       return this.$store.getters.options;
    },
    optColors: function() {
       return this.$store.getters.optColors;
    },
  },
  methods: {
    checkAnswer: function(answer) {
       this.$store.dispatch('checkAnswer',{answer:answer});
    },
  },
}
</script>
<style scoped>
    th{
        font-size: 40px;
        font-family: 'Merienda', cursive;
        width:25%;
    }

    table {
        width:100%;
        height:100%;
    }

    button{
        width:100%;
        height:250px;
        font-size:40px;
        font-weight:bold;
        border:none;
        border-width:0px;
        background:#FFFFFF;
    }

    button:hover{
        background: rgba(255, 215, 201, 1);
    }


    h1 {
        text-align:center;
    }

    tr {
        text-align:center;
    }

    td {
        font-size: 20px;
    }
</style>