<template>

 <div id="quiz">
        <div v-if="showOpts">
<h1>Kana Quiz</h1>

<p>Japanese uses three main scripts (or alphabets): hiragana, katakana and kanji.

  Kanji (漢字) are adopted Chinese characters used in modern Japanese writing. Most Japanese words (nouns, adjectives and verbs) are written in kanji. There are no spaces in Japanese, so kanji helps distinguish when a new word begins. Kanji characters are symbols that represents words. This quiz focuses on reading Japanese without kanji. We’ll be focusing on hiragana and katakana (often referred to as kana).</p><p>

Hiragana (ひらがな) is used mainly for grammatical purposes.  In Japanese the suffix “-ing” would be written in hiragana. Participles, expressions, and words with extremely difficult or rare kanji are mostly written in hiragana.  Hiragana characters are easy to identify because they’re usually a bit curvy and look simpler than kanji characters.</p><p>

  While katakana (カタカナ) represents the same sounds as hiragana, it’s mainly used to represent foreign words. Foreign names are represented in katakana, as are many foreign foods. Japan’s fun and quirky onomatopoeia appears in both katakana and hiragana. Katakana characters take a boxier form than hiragana characters do, and appear simpler than kanji. Every katakana character has a hiragana counterpart that makes the same sound.

<li>レディー・ガガ (Lady Gaga)</li>
<li>ボン・ジョヴィ (Bon Jovi)</li>
<li>ジョン・スミス (John Smith)</li></p><p>

The small circle in between the previous names separates a first name from a last name (or separates two names) so Japanese readers can tell where a foreign name begins and ends.

ビールを飲んでみましょう！(Let’s drink beer!)
私はアメリカンフットボールが好きです！(I like American football*.)
マクドナルドで食べる。(Eat at McDonald’s.)

*American football can also be called アメフト.

Because these words aren’t native to Japan, they’re written in katakana. Many sound words (like sound effects in manga or animal noises) are also written in katakana.
</p>

<p>This quiz assumes familiarity with<a href="http://www.sf.airnet.ne.jp/~ts/japanese/shape_k.html"> hiragana and katakana</a> and helps you focus in on what kana you stuggle with the most. Below are a set of options to create your own personal quiz. By picking 2-3 of the chracter types you create your quiz. You will be tested on the definitions of what you select in terms of the other types you select. For example if you choose hiragana and katakana you would be quizzed on hiragana in terms of katakana characters or katakana in terms of hriagana characters. The extended characters selection allows you to select if you would like to be tested on the "normal" character list or if you would like to include tenten characters(Characters with a mark in the upper right that slightly changes the pronunciation of the character) or dipthongs (combinational characters). Once you have created your quiz hit "save!" and you will be directed to the quiz! At anytime you can view your stats from the stats page or come back here to options to switch your quiz type or reset your sets to start fresh. 
	  
            <p>Character types: <br><b v-if="warning">(SELECT AT LEAST 2)</b></p>
              <li><input type="checkbox" id="h" value="0" v-model="checkedNames">
              <label for="jack">Hiragana</label></li>
              <li><input type="checkbox" id="k" value="1" v-model="checkedNames">
              <label for="john">Katakana</label></li>
              <li><input type="checkbox" id="r" value="2" v-model="checkedNames">
              <label for="mike">Romaji</label></li>
              
            <p>Extended characters:</p>
              <li><input type="checkbox" id="t" v-model="tenten">
              <label for="mike">Tenten</label></li>
              <li><input type="checkbox" id="d" v-model="yoon">
              <label for="mike">Yōon (Dipthongs)</label></li>
              

</li>
<button style="margin-top:20px; height:60px" v-on:click="deleteStats">Reset Stats</button>
            <button style="margin-top:20px; height:60px" v-on:click="saveOpts">Save!</button>
        </div>
        <div v-else-if="showStats">
            <table>
                <tr>
                <th>Character</th>
                <th>Score</th>
                </tr>
                <tr v-for="character in alphabet" v-cloak>
                    <td>{{ character.question }}</td>
                    <td>{{ character.correct }} / {{ character.attempts }}</td>
                </tr>
            </table>
            <button id="stat" style="margin-top:20px; height:60px" v-on:click="setPage(1)">Return to quiz</button>
        </div>
        <div v-else>
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
            <tr>
                <td colspan = "3">
                    <button style="margin-top:20px; height:60px" v-on:click="setPage(2)">Options</button>
                    <button style="margin-top:20px; height:60px" v-on:click="setPage(3)">Show statistics</button>
                </td>
                
            </tr>
            </table>
        </div>
    </div>
    </article>
    </section>
<hr>

</body>


</template>

<script>


var AlphaEnum = {
  HIRAGANA: 0,
  KATAKANA: 1,
  ROMAJI: 2,
};

var quiz = new Vue({
  el: '#quiz',
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
  setPage: function(page)
  {
      if(page === 1)
	  {
          this.showStats = false;
          this.showOpts = false;
      } else if(page === 2){
          this.showStats = false;
          this.showOpts = true;
      } else if (page === 3)
      {
          this.showStats = true;
          this.showOpts = false;
      }
      this.updatePage(page);
  },
  saveOpts: function()
  {
      if(this.checkedNames.length <=1){ 
        this.warning = true;
      }
      else{
        this.warning = false;
        
        this.num_jap_char = 45;
        if(this.tenten) this.num_jap_char += 25;
        if(this.yoon) this.num_jap_char += 24;
    
        this.questionMode(this.checkedNames[0],this.checkedNames[1]);
        console.log(this.checkedNames);
        
        this.updateOpts;
        this.setPage(1);
        this.nextQuestion();
      }
  }
  }
});


</script>

<style scoped>

</style>