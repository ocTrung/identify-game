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

const handleCorrect = () => {
  correctCount++
}

const questionDisplay = document.getElementById('question-display')

const displayNewQuestion = () => {
  // Display image based on index
  imgDisplay.src = gameImages[index].img
  // Hide next button
  nextButton.classList.add('hidden')
  // Display submit button
  submitButton.classList.remove('hidden')
  // Correct answer + random 3 choices
  let answerIndexList = getRandomAnswers(index)
  // Reference to correct answer
  const correct = gameImages[index].game
  
  // Generate radio buttons for choices
  answerIndexList.forEach((answerIndex , index) => {
    const choice = document.getElementById(`choice${index + 1}`)
    const label = document.getElementById(`label-choice${index + 1}`)
    
    choice.setAttribute('value', gameTitles[answerIndex])
    label.innerText = gameTitles[answerIndex]
    
    // Check first radio button as default
    if (index === 0)
      choice.setAttribute('checked', true)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = new FormData(form)
    let answer
  
    // get checked value
    for (const [name, value] of data) {
      answer = value
    }
  
    if (answer === correct) {
      handleCorrect()
    } 
    
    submitButton.classList.add('hidden')
    displayNextButton()
  }
  
  form.addEventListener('submit', handleSubmit, false)
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
