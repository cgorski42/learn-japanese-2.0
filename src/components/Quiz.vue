<template>
<div>
<table>
    <tr style="height:50px">
        <th colspan="2">Score: {{score}} / {{attempts}}</th>
    </tr>
    <tr>
        <th v-cloak>{{question}}</th>
        <td>
            <table>
            <tr>
                <td><button v-on:click="checkAnswer(0)" v-bind:style="{background: opt_colors[0]}" v-cloak> {{options[0]}} </button></td>
                <td><button v-on:click="checkAnswer(1)" v-bind:style="{background: opt_colors[1]}" v-cloak> {{options[1]}} </button></td>
            </tr>
            <tr> 
                <td><button v-on:click="checkAnswer(2)" v-bind:style="{background: opt_colors[2]}" v-cloak> {{options[2]}} </button></td>
                <td><button v-on:click="checkAnswer(3)" v-bind:style="{background: opt_colors[3]}" v-cloak> {{options[3]}} </button></td>
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
      data: {
        character: '',
        progress: '',

        question_num: 0,
        question:"n/a",
        q_mode: 1,
        
        num_options: 4,
        options: ["n/a","n/a","n/a","n/a"],
        opt_colors: ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"],
        answer: 0,
        ans_mode: AlphaEnum.ROMAJI,
        
        num_jap_char: 45,
        alphabet: [],

        checkedNames: ["0","2"],
        
        tenten: false,
        tentenIdx: 46,
        numTenten: 25,
        
        yoon: false,
        yoonIdx: 71,
        
        showStats: false,
        showOpts:true,
        warning: false,
        score: 0,
        attempts: 0,
        stats: ''
      },
      created: function() {
          this.getOptions();
          this.questionMode(this.q_mode, this.ans_mode);
          setTimeout(this.nextQuestion(),100);
      },
      methods: {
        getOptions: function(){
           axios.get("/api/alphabet/").then(response => {
              this.alphabet = response.data.alpha;
              this.tenten = response.data.tenten;
              this.yoon = response.data.yoon;
              this.numChars = response.data.numChars;
              this.setPage(response.data.curPage);
              return true;
            }).catch(err => {
          });
        },
        questionMode: function(q, a)
        {
           q = parseInt(q);
           a = parseInt(a);
           this.alphabet = this.alphabet.map(function(item, idx){
            switch(q){
                case AlphaEnum.HIRAGANA:
                    item.question = item.hiragana;
                    break;
                case AlphaEnum.KATAKANA:
                    item.question = item.katakana;
                    break;
                case AlphaEnum.ROMAJI:
                    item.question = item.romaji;
                    break;
            }
            switch(a){
               case AlphaEnum.HIRAGANA:
                   item.answer = item.hiragana;
                   break;
               case AlphaEnum.KATAKANA:
                   item.answer = item.katakana;
                   break;
               case AlphaEnum.ROMAJI:
                   item.answer = item.romaji;
                   break;
            }
            return item;
           });
        },
        nextQuestion: function()
        {
           this.opt_colors = ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"];
           for(i=0;i < this.num_options;i++)
           {
                var cont = true;
                while(cont)
                {
                    this.question_num = Math.floor(Math.random()*this.num_jap_char);
                    if(!this.tenten && this.question_num >= this.tentenIdx)
                    {
                        this.question_num += this.numTenten;
                    }
                    cont = false;
                    for (j = 0; j < i; j++)
                    {
                        if (this.options[j] === this.question_num) 
                        {
                            cont = true;
                            break;
                        }
                    }
                }
                this.options[i] = this.question_num;
           }
           
           if(Math.floor(Math.random() * 2) === 0) // occasionally switch mode
           {
              i = Math.floor(Math.random() * this.checkedNames.length);
              if(this.checkedNames.length === 3)
              {
                  do
                  {
                      j = Math.floor(Math.random() * 3);
                  }while (i === j);
              }
              else{
                  j = (i===0) ? 1 : 0;
              }

              this.q_mode = this.checkedNames[i];
              this.ans_mode = this.checkedNames[j];
              
              this.questionMode(this.q_mode, this.ans_mode); 
           }
           this.answer  = Math.floor(Math.random() * this.num_options);
           this.question = this.alphabet[this.options[this.answer]].question;
           
           for(i=0;i < this.num_options;i++)
           {
               this.options[i] = this.alphabet[this.options[i]].answer;
           }
        },
        updateStats: function(alpha, idx) {
          axios.put("/api/alphabet/" + idx, {
              attempts: alpha.attempts,
              correct: alpha.correct,
          }).then(response => {
            return true;
          }).catch(err => {
          }); 
        },
        updateOpts: function() {
          axios.put("/api/options/", {
              tenten: this.tenten,
              yoon: this.yoon,
              numChars: this.num_jap_char,
          }).then(response => {
            return true;
          }).catch(err => {
          }); 
        },
        updatePage: function(page) {
          axios.put("/api/pageNum/", {
              curPage : page,
          }).then(response => {
            return true;
          }).catch(err => {
          }); 
        },
          deleteStats: function() {
          axios.delete("/api/alphabet/").then(response => {
              this.getOptions();
            return true;
          }).catch(err => {
          }); 
        },
        checkAnswer: function(answer)
        {
            this.attempts += 1;
            this.alphabet[this.question_num].attempts += 1;
            
            if(this.answer === answer)
            { 
                this.opt_colors[answer] = "#69A561";
                this.score += 1;
                this.alphabet[this.question_num].correct += 1;   
                setTimeout(this.nextQuestion, 350);
            }
            else
            {
                this.opt_colors[answer] = "#ED5C68";
            }
            this.alphabet[this.question_num].rating = this.alphabet[this.question_num].correct / this.alphabet[this.question_num].attempts;
            this.updateStats(this.alphabet[this.question_num],this.question_num);
        },
      }
    });
</script>