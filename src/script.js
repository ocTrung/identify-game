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

const menu = document.querySelector('.menu')
const quizContainer = document.querySelector('.quiz-container')
let index = 0
let correctCount = 0

// Starts a fresh game
const init = () => {
  menu.classList.add('hidden')
  quizContainer.classList.remove('hidden')
  
  index = 0
  correctCount = 0
  displayNewQuestion()
}

const startButton = document.getElementById('start-btn')
startButton.onclick = init

const imgDisplay = document.getElementById('img-display')
const answersDisplay = document.getElementById('answers-display')
const gameTitles = gameImages.map(({game}) => game)

const nextButton = document.getElementById('next-button')
const handleNext = () => {
  if (isGameOver()) {
    displayResults()
  } else {
    index++
    displayNewQuestion()
  }
}
nextButton.addEventListener('click', handleNext)
const displayNextButton = () => {
  nextButton.classList.remove('hidden')  
}

const form = document.querySelector('form')
const submitButton = document.getElementById('submit-button')

const choice1 = document.getElementById('choice1')
const choice2 = document.getElementById('choice2')
const choice3 = document.getElementById('choice3')
const choice4 = document.getElementById('choice4')
const label1 = document.getElementById('choice-label1')
const label2 = document.getElementById('choice-label2')
const label3 = document.getElementById('choice-label3')
const label4 = document.getElementById('choice-label4')
const choices = [ {'choice':choice1, 'label':label1},
                  {'choice':choice2, 'label':label2},
                  {'choice':choice3, 'label':label3},
                  {'choice':choice4, 'label':label4},]

const correctColor = 'text-green-400'
const incorrectColor = 'text-red-600'

const handleCorrect = () => {
  for (const {choice, label} of choices) {
    if (choice.checked && choice.value === correct) {
      label.textContent += ' ' + '(Correct)'
      label.classList.add(correctColor)
    }
  }
  correctCount++
}

const handleIncorrect = (userAnswer) => {
  for (const {choice, label} of choices) {
    if (choice.checked && choice.value === userAnswer) {
      label.textContent += ' ' + '(Incorrect)'
      label.classList.add(incorrectColor)
    }
  }
}

const questionDisplay = document.getElementById('question-display')
let correct

const resetQuestionDisplay = () => {
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

const displayNewQuestion = () => {
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

const handleSubmit = (e) => {
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

form.addEventListener('submit', handleSubmit, false)

// Returns: list of 4 indexes for respective answer
const getRandomAnswers = (correctIndex) => {
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

const sortAnswersRandom = (list) => {
  return list.sort((a,b) => Math.floor(Math.random() * 2) - 1)
}

const isGameOver = () => {
  return index === gameImages.length -1
}

const displayResults = () => {
  const results = document.getElementById('results')
  const resultsContainer = document.querySelector('.results-container')

  quizContainer.classList.add('hidden')
  resultsContainer.classList.remove('hidden')

  results.textContent = `You got ${correctCount}/${gameImages.length} correct`
}
