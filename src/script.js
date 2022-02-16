const questions = [
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

const games = questions.map(({game}) => {
  return game
})

const questionDisplay = document.getElementById('question-display')
const answersDisplay = document.getElementById('answers-display')
const imgDisplay = document.getElementById('img-display')
const startButton = document.getElementById('start-btn')
const quizContainer = document.querySelector('.quiz-container')
const menu = document.querySelector('.menu')
let index = 0
let correctCount = 0
startButton.onclick = init

function init() {
  menu.classList.add('hidden')
  quizContainer.classList.remove('hidden')

  index = 0
  correctCount = 0
  displayNewQuestion()
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

function displayNewQuestion() {
  // apply image of current question to html
  imgDisplay.src = questions[index].img
  // get a random set of 4 choices from all possible answers. Includes correct answer.
  // this is a list of indexes
  let answerIndexList = getRandomAnswers(index)
  // reference to correct answer using list of questions + index
  const correct = questions[index].game

  // remove previous choices
  answersDisplay.innerHTML = ''

  // generate buttons for choices
  answerIndexList.forEach(ansIdx => {
    const answerButton = document.createElement('button')
    const choice = games[ansIdx]
    answerButton.textContent = choice
    answerButton.addEventListener('click', () => onAnswerButtonClick(correct, choice))
    answersDisplay.append(answerButton)
  })
}

function getRandomAnswers(correctIndex) {
  let getRandIndex = () => Math.floor(Math.random() * questions.length)
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

function isGameOver() {
  console.log('index', index)
  console.log('length', questions.length)
  return index === questions.length -1
}

function displayResults() {
  const results = document.getElementById('results')
  const resultsContainer = document.querySelector('.results-container')

  quizContainer.classList.add('hidden')
  resultsContainer.classList.remove('hidden')

  results.textContent = `You got ${correctCount}/${questions.length} correct`
}
