const gameImages = [
  {
    img: 'https://i.imgur.com/LrBgi5B.png',
    game: 'Ocarina of Time'
  },
  {
    img: 'https://i.imgur.com/JWcQbmY.png',
    game: 'Final Fantasy'
  },
  {
    img: 'https://i.imgur.com/97AMcyX.png',
    game: 'Fall Out'
  },
  {
    img: 'https://i.imgur.com/4UqEVSK.png',
    game: 'Pokemon'
  }
]

const startButton = document.getElementById('start-btn')
startButton.onclick = init

const menu = document.querySelector('.menu')
const quizContainer = document.querySelector('.quiz-container')
let index = 0
let correctCount = 0

// Starts a fresh game
function init() {
  menu.classList.add('hidden')
  quizContainer.classList.remove('hidden')
  
  index = 0
  correctCount = 0
  displayNewQuestion()
}

let correct = 0
const answersDisplay = document.getElementById('answers-display')
const gameTitles = gameImages.map(({game}) => game)
const imgDisplay = document.getElementById('img-display')
const choiceElements = Array.from(document.querySelectorAll('.choice'))
const choiceLabelElements = Array.from(document.querySelectorAll('.choice-label'))
const numChoices = choiceElements.length
const choices = []

for(let i = 0; i < numChoices; i++) {
  choices.push({choice: choiceElements[i], label: choiceLabelElements[i]})
}

function displayNewQuestion() {
  resetQuestionDisplay()
  // Display image based on index
  imgDisplay.src = gameImages[index].img
  // Correct answer + random 3 choices
  let answerIndexList = getRandomAnswers(index)
  // Reference to correct answer
  correct = gameImages[index].game

  // Generate radio buttons for choices
  answerIndexList.forEach((answerIndex , index) => {
    const {choice, label} = choices[index]
    
    choice.setAttribute('value', gameTitles[answerIndex])
    label.innerText = gameTitles[answerIndex]
    
    if (index === 0)
      choice.checked = true
    else 
      choice.checked = false
  })
}

const nextButton = document.getElementById('next-button')
const submitButton = document.getElementById('submit-button')

function resetQuestionDisplay() {
  // Hide next button
  nextButton.classList.add('hidden')
  // Display submit button
  submitButton.classList.remove('hidden')
  // 
  for ({label} of choices) {
    label.classList.remove(incorrectColor)
    label.classList.remove(correctColor)
  }
}

// Returns: list of 4 indexes for respective answer
function getRandomAnswers(correctIndex) {
  let getRandIndex = () => Math.floor(Math.random() * gameImages.length)
  let randomAnswers = [correctIndex]
  const numChoices = 4
  let randIndex

  while (randomAnswers.length < numChoices) {
    randIndex = getRandIndex()
    if (!randomAnswers.includes(randIndex))
      randomAnswers.push(randIndex)
    randIndex = getRandIndex()
  }
  return sortAnswersRandom(randomAnswers)
}

function sortAnswersRandom(list) {
  return list.sort((a,b) => Math.floor(Math.random() * 2) - 1)
}

const form = document.querySelector('form')
form.addEventListener('submit', handleSubmit, false)

function handleSubmit(e) {
  e.preventDefault()
  let data = new FormData(form)
  let userChoice
  
  // get checked value
  for (const [name, value] of data) {
    userChoice = value
  }

  if (userChoice === correct) {
    handleCorrect()
  } else {
    handleIncorrect(userChoice)
  }
  
  submitButton.classList.add('hidden')
  displayNextButton()
}

function displayNextButton() {
  nextButton.classList.remove('hidden')  
}

nextButton.addEventListener('click', handleNext)

function handleNext() {
  if (isGameOver()) {
    displayResults()
  } else {
    index++
    displayNewQuestion()
  }
}

const correctColor = 'text-green-500'

function handleCorrect() {
  for (const {choice, label} of choices) {
    if (choice.checked && choice.value === correct) {
      label.textContent += ' ' + '(Correct)'
      label.classList.add(correctColor)
    }
  }
  correctCount++
}

const incorrectColor = 'text-red-600'

function handleIncorrect(userAnswer) {
  for (const {choice, label} of choices) {
    if (choice.checked && choice.value === userAnswer) {
      label.textContent += ' ' + '(Incorrect)'
      label.classList.add(incorrectColor)
    }
  }
}

function isGameOver() {
  return index === gameImages.length -1
}

const results = document.getElementById('results')
const resultsContainer = document.querySelector('.results-container')

function displayResults() {
  quizContainer.classList.add('hidden')
  resultsContainer.classList.remove('hidden')

  results.textContent = `You got ${correctCount}/${gameImages.length} correct`

  const restartButton = document.getElementById('restart-button')
  restartButton.addEventListener('click', handleRestart)
  resultsContainer.append(restartButton)
}

function handleRestart() {
  init()
  clearResultsDisplay()
}

function clearResultsDisplay() {
  resultsContainer.classList.add('hidden')
}
