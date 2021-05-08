
$(document).ready(function() {
  const question = document.querySelector('#question')
  const choices = Array.from(document.querySelectorAll('.choice-text'))
  const progressText = document.querySelector("#progressText")
  const scoreText = document.querySelector(".hud-main-text")
  const progressBarFull = document.querySelector("#progressBarFull")

  var curr_question = {}
  let accept = true
  let score = 0;
  let questionCount = 0;
  let availableQuestions = [];
  var cityIds = ["2643741", "2644688", "2633352", "2654675", "2988507", "2990969"]
  var a = Math.floor(Math.random(1, 6)-1)
  var curr_city = cityIds[a]
  let questionIndex = 0;
  /*const data = $.ajax({
    url:"http://api.openweathermap.org/data/2.5/"+ curr_city,
    appid: "de6d52c2ebb7b1398526329875a49c57",
    dataType: 'json',
    success: processResult

  })*/
  function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // console.log('responseText:' + xmlhttp.responseText);
        try {
          var data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          console.log(err.message + " in " + xmlhttp.responseText);
          return;
        }
        callback(data);
      }
    };
  
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  
  ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
    /*document.getElementById("id").innerHTML = data[0]["id"];*/
    /*document.getElementById("url").innerHTML = data[0]["url"];*/
    $('.pic').attr("src", data[0]["url"]);
    
  });
  
  
    function processResult(data) {
      url = data
      // data is json returned by weatherstack
      // replace html in id="results" with string version of data
      $("#progressText").html("Enter Name")
      // write location name and country to console
      console.log(data);
    }

    async function getQuestions() {
      let questions_ = []

      let data = await $.get("https://opentdb.com/api.php?amount=4", (response) => {
        let questions = response.results;
        console.log(questions);
        questions.map((question) => {
          let correct_answer = question.correct_answer
          let question_prompt = question.question.replace('&#039;', "'")
          question_prompt = question.question.replace('&#039;', "'")
          question_prompt = question_prompt.replace('&quot;', '"')
          question_prompt = question.question.replace('&#039;', "'")
          question_prompt = question_prompt.replace('&quot;', '"')
          question_prompt = question.question.replace('&#039;', "'")
          question_prompt = question_prompt.replace('&quot;', '"')
          question_prompt = question.question.replace('&#039;', "'")
          question_prompt = question.question.replace('&#039;', "'")
          question_prompt = question_prompt.replace('&quot;', '"')
          
          let answers = question.incorrect_answers
          answers.push(correct_answer)
          shuffleArray(answers)

          for (let i = 0; i < 4; i++) {
            for (let j = 0; j <= 10; j++) {
              answers[i] = answers[i].replace('&#039;', "'")
              answers[i] = answers[i].replace('&quot;', '"')
            }
          }

          let output = {question: question_prompt, choice1: answers[0], choice2: answers[1], choice3: answers[2], choice4: answers[3], answer: correct_answer}
          questions_.push(output)
        })
      })

      return questions_
    }

  var Score_Points = 0
  const Max_Quest = 4



  function startGame() {
    questionCount = 0
    score = 0
    availableQuestions = [...questions]

    getQuestion()
  }

  let questions;
  getQuestions().then((result) => {
    questions = result;    
    startGame();
  });

  function getQuestion() {
    // if(availableQuestions.length === 0 || questionCount >= Max_Quest) {
    //   $(document).ready(function() {
    //     $("#progressText").html("Enter Name")
    //     return window.location.assign("./end.html")
    //   })
    // }
    questionCount++
    progressText.innerText = questionCount + " of " + Max_Quest
    progressBarFull.style.width = questionCount/Max_Quest * 100 +'%'

    curr_question = availableQuestions[questionIndex]
    console.log(availableQuestions);
    question.innerText = curr_question.question

    choices.forEach(choice => {
      const number = choice.dataset['number']
      choice.innerText = curr_question['choice' + number]
    })
    
    accept = true
  }

  choices.forEach(choice => {
    
    choice.addEventListener('click', e => {
      if(!accept) return

      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']

      if (selectedChoice.innerHTML === questions[questionIndex].answer) {
        console.log('Correct');
        incrementScore(100)
      } else {
        console.log('Incorrect');
      }

      
      questionIndex += 1;

      if (questionIndex === availableQuestions.length) {
        if (score < 400)
        window.location.assign("./end.html");
        else {
          window.location.assign("./highScores.html")
        }
      } else {
        getQuestion();
      }
      
      
      scoreText.innerText = Score_Points
      

      /*let classToApply = selectedAnswer == curr_question.answer ? 'correct' :
      'incorrect'

      if (classToApply === 'correct') {
        incrementScore(Score_Points)
      }*/
      selectedChoice.parentElement.classList.add("correct")

      // setTimeout(() => {
      //   selectedChoice.parentElement.classList.remove("correct")
      //   getQuestion()
      // }, 1000)
      })
    })

    function incrementScore(num){
      Score_Points = Score_Points + num
      score = Score_Points
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }
  
  })
  










