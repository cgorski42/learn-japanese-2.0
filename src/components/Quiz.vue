<template>
<div>
    <table>
    <!--tr style="height:50px">
        <th colspan="2">Score: {{score}} / {{attempts}}</th>
    </tr-->
    <tr>
        <th v-cloak>{{question}}</th>
        <td>
            <table>
            <tr>
                <td><button v-on:click="checkAnswer(0)" v-bind:style="{background: optColors[0]}" v-cloak> {{options[0]}} </button></td>
                <td><button v-on:click="checkAnswer(1)" v-bind:style="{background: optColors[1]}" v-cloak> {{options[1]}} </button></td>
            </tr>
            <tr> 
                <td><button v-on:click="checkAnswer(2)" v-bind:style="{background: optColors[2]}" v-cloak> {{options[2]}} </button></td>
                <td><button v-on:click="checkAnswer(3)" v-bind:style="{background: optColors[3]}" v-cloak> {{options[3]}} </button></td>
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