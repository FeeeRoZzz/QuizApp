const quizData = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Rome"],
      correct: "Paris",
      explanation: "Paris has been the capital of France since the 5th century."
    },
    {
      question: "What does HTML stand for?",
      answers: [
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Transfer Markup Language"
      ],
      correct: "Hyper Text Markup Language",
      explanation: "HTML is the standard markup language for creating web pages."
    },
    {
      question: "Which language is used for styling web pages?",
      answers: ["HTML", "JQuery", "CSS", "XML"],
      correct: "CSS",
      explanation: "CSS (Cascading Style Sheets) describes how HTML elements are displayed."
    },
    {
      question: "Which is not a programming language?",
      answers: ["Python", "HTML", "Java", "C++"],
      correct: "HTML",
      explanation: "HTML is a markup language, not a programming language."
    },
    
    {
      question: "What does DOM stand for?",
      answers: [
        "Document Object Model",
        "Data Object Model",
        "Display Output Mode",
        "Document Order Map"
      ],
      correct: "Document Object Model",
      explanation: "The DOM represents the document as nodes and objects."
    },
    
  ];
  
//  DOM
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const scoreEl = document.getElementById("score-display");
  const progressBar = document.querySelector(".progress-bar::after");
  const progressText = document.getElementById("progress-text");
  const resultContainer = document.getElementById("result-container");
  const finalScoreEl = document.getElementById("final-score");
  const performanceMessageEl = document.getElementById("performance-message");
  const answerExplanationEl = document.getElementById("answer-explanation");
  const timeoutLoader = document.getElementById("timeout-loader");
  const loaderBar = document.querySelector(".loader-bar");
  const resultBadge = document.getElementById("result-badge");
  
  // Quiz State
  let currentQuestion = 0;
  let score = 0;
  let selectedAnswer = null;
  let quizCompleted = false;
  let timeoutId = null;
  
  // Initialize the quiz
  function initQuiz() {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
    selectedAnswer = null;
    resultContainer.classList.remove("active");
    updateProgress();
    loadQuestion();
  }
  
  // Load current question
  function loadQuestion() {
    if (quizCompleted) return;
    
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    answersEl.innerHTML = "";
    
    // Reset button state
    nextBtn.disabled = true;
    nextBtn.innerHTML = `<span>${currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    
    // Create answer options
    question.answers.forEach(answer => {
      const answerOption = document.createElement("div");
      answerOption.className = "answer-option animate-fade";
      answerOption.innerHTML = `
        <input type="radio" name="answer" id="answer-${answer.replace(/\s+/g, '-')}" value="${answer}">
        <label for="answer-${answer.replace(/\s+/g, '-')}">${answer}</label>
      `;
      
      const input = answerOption.querySelector("input");
      input.addEventListener("change", () => {
        selectedAnswer = answer;
        nextBtn.disabled = false;
        nextBtn.innerHTML = `<span>${currentQuestion === quizData.length - 1 ? 'Submit Answer' : 'Next Question'}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;
        
        // Highlight selected answer
        document.querySelectorAll(".answer-option").forEach(opt => {
          opt.classList.remove("selected");
        });
        answerOption.classList.add("selected");
      });
      
      answersEl.appendChild(answerOption);
    });
    
    updateProgress();
  }
  
  // Update progress bar and score
  function updateProgress() {
    // Update progress bar
    const progressPercentage = ((currentQuestion) / quizData.length) * 100;
    document.documentElement.style.setProperty('--progress-width', `${progressPercentage}%`);
    
    // Update progress text
    progressText.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    
    // Update score display
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
  }
  
  // Check answer and provide feedback
  function checkAnswer() {
    if (selectedAnswer === null) return;
    
    const question = quizData[currentQuestion];
    const answerOptions = document.querySelectorAll(".answer-option");
    
    answerOptions.forEach(option => {
      const input = option.querySelector("input");
      option.classList.remove("correct", "incorrect");
      
      // Disable all inputs after selection
      input.disabled = true;
      
      // Mark correct and incorrect answers
      if (input.value === question.correct) {
        option.classList.add("correct");
      } else if (input.value === selectedAnswer && selectedAnswer !== question.correct) {
        option.classList.add("incorrect");
      }
    });
    
    // Update score if correct
    if (selectedAnswer === question.correct) {
      score++;
      updateProgress();
    }
    
    // Show explanation
    answerExplanationEl.textContent = question.explanation;
    answerExplanationEl.style.display = "block";
  }
  
  // Show quiz results
  function showResults() {
    quizCompleted = true;
    
    // Calculate percentage
    const percentage = (score / quizData.length) * 100;
    
    // Set result badge color based on performance
    if (percentage >= 90) {
      resultBadge.style.color = "#4caf50";
      resultBadge.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
    } else if (percentage >= 70) {
      resultBadge.style.color = "#2196f3";
      resultBadge.style.backgroundColor = "rgba(33, 150, 243, 0.1)";
    } else if (percentage >= 50) {
      resultBadge.style.color = "#ff9800";
      resultBadge.style.backgroundColor = "rgba(255, 152, 0, 0.1)";
    } else {
      resultBadge.style.color = "#f44336";
      resultBadge.style.backgroundColor = "rgba(244, 67, 54, 0.1)";
    }
    
    finalScoreEl.textContent = `You scored ${score}/${quizData.length}`;
    
    // Performance message
    let message = "";
    if (percentage >= 90) {
      message = "Outstanding performance! You're a coding master!";
    } else if (percentage >= 70) {
      message = "Great job! You have solid coding knowledge.";
    } else if (percentage >= 50) {
      message = "Good effort! Keep learning and practicing.";
    } else {
      message = "Keep going! Every coder starts somewhere.";
    }
    
    performanceMessageEl.textContent = message;
    resultContainer.classList.add("active");
  }
  
  // Start timeout animation
  function startTimeoutAnimation(duration) {
    timeoutLoader.style.display = "block";
    loaderBar.style.width = "0%";
    loaderBar.style.transition = "none";
    void loaderBar.offsetWidth; // Trigger reflow
    loaderBar.style.transition = `width ${duration}ms linear`;
    loaderBar.style.width = "100%";
  }
  
  // Event Listeners
  nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) return;
    
    checkAnswer();
    
    // Disable next button during timeout
    nextBtn.disabled = true;
    
    // Show and animate timeout loader
    startTimeoutAnimation(1000);
    
    // Clear any existing timeout
    if (timeoutId) clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      timeoutLoader.style.display = "none";
      answerExplanationEl.style.display = "none";
      
      currentQuestion++;
      
      if (currentQuestion < quizData.length) {
        selectedAnswer = null;
        loadQuestion();
      } else {
        showResults();
      }
    }, 1000);
  });
  
  restartBtn.addEventListener("click", () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutLoader.style.display = "none";
    initQuiz();
  });
  
  // Start the quiz
  initQuiz();