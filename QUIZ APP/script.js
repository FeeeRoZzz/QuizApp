const quizData = [
    {
      question: "What is the capital of France ?",
      answers: ["Paris", "London", "Berlin", "Rome"],
      correct: "Paris"
    },
    {
      question: "What does HTML stand for?",
      answers: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
      correct: "Hyper Text Markup Language"
    },
    {
      question: "Which language is used for styling web pages?",
      answers: ["HTML", "JQuery", "CSS", "XML"],
      correct: "CSS"
    },
    {
      question: "Which is not a programming language?",
      answers: ["Python", "HTML", "Java", "C++"],
      correct: "HTML"
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: ["<js>", "<javascript>", "<script>", "<code>"],
      correct: "<script>"
    },
    {
      question: "What does DOM stand for?",
      answers: ["Document Object Model", "Data Object Model", "Display Output Mode", "Document Order Map"],
      correct: "Document Object Model"
    }

    // quizData as a JS Array (FEROZ)

    
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const scoreEl = document.getElementById("score");
  const progressBar = document.getElementById("progress-bar");
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.answers.forEach(answer => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = answer;
      label.appendChild(input);
      label.appendChild(document.createTextNode(answer));
      answersEl.appendChild(label);
    });
  
    updateProgressBar();
    restartBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
  }
  
  function updateProgressBar() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function getSelectedAnswer() {
    const answers = document.getElementsByName("answer");
    for (let ans of answers) {
      if (ans.checked) {
        return ans.value;
      }
    }
    return null;
  }
  
  nextBtn.addEventListener("click", () => {
    const selected = getSelectedAnswer();
    if (!selected) {
      alert("Please select an answer.");
      return;
    }
  
    if (selected === quizData[currentQuestion].correct) {
      score++;
    }
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });
  
  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    scoreEl.textContent = "";
  });
  
  function showResults() {
    questionEl.textContent = "Yo , Quiz Completed!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    scoreEl.textContent = `Your score: ${score}/${quizData.length}`;
    updateProgressBar(); // Set to full
  }
  
  loadQuestion();
  