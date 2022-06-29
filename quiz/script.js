const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const modalContainerElement=document.getElementById('modal-container')
const closeElement=document.getElementById('close')

// answerButtonsElement.addEventListener('click',()=>{
//   modalContainerElement.classList.add('show')
// })

// closeElement.addEventListener('click',()=>{
//   modalContainerElement.classList.remove('show')
// })

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct') 
   
  } else {
    element.classList.add('wrong') 
    
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'How many food habits class we had?',
    answers: [
      { text: '3', correct: true, },
      { text: '4', correct: false },
      { text: '2', correct: false },
      { text: '1', correct: false }
    ]
    
  },
  {
    question: 'What we call animal that eating plant-based food only?',
    answers: [
      { text: 'Omnivore', correct: false },
      { text: 'Carnivore', correct: false },
      { text: 'Herbivore', correct: true }
    ]
  },
  {
    question: 'Which animal below si carnivore?',
    answers: [
      { text: 'Cow', correct: false },
      { text: 'Tiger', correct: true },
      { text: 'Deer', correct: false },
      { text: 'Horse', correct: false }
    ]
  },
  {
    question: 'What we call animal that eating plant-based food and meat?',
    answers: [
      { text: 'Omnivore', correct: true },
      { text: 'Carnivore', correct: false },
      { text: 'Herbivore', correct: false }
    ]
  },
  {
    question: 'How to identify carnivore animal?',
    answers: [
      { text: 'Has eyes are located on the sides of their heads let them see what goes on around them. ', correct: false },
      { text: 'Has razor-sharp or claws, as well as fangs', correct: true }
    ]
  }
]

