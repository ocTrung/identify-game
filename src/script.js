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

const displayNewQuestion = () => {
  // Display image based on index
  imgDisplay.src = gameImages[index].img
  // Correct answer + random 3 choices
  let answerIndexList = getRandomAnswers(index)
  // Reference to correct answer
  const correct = gameImages[index].game
  // Remove previous choices
  answersDisplay.innerHTML = ''

  // Generate buttons for choices
  answerIndexList.forEach(ansIdx => {
    const answerButton = document.createElement('button')
    const choice = gameTitles[ansIdx]
    answerButton.textContent = choice
    answerButton.addEventListener('click', () => onAnswerButtonClick(correct, choice))
    answersDisplay.append(answerButton)
  })
}

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

const onAnswerButtonClick = (correct, choice) => {
  if (choice === correct) {
    correctCount++
  }
  if (isGameOver()) {
    displayResults()
  } else {
    index++
    displayNewQuestion()
  }
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
