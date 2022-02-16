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
let index = 0
let correctCount = 0

function init() {
  index = 0
  correctCount = 0
  displayNewQuestion()
  index++
}

function displayNewQuestion() {
  imgDisplay.src = questions[index].img
  let answerIndexList = getRandomAnswers(index)

  answerIndexList.forEach(ansIdx => {
    const button = document.createElement('button')
    button.textContent = games[ansIdx]
    button.addEventListener('click', () => console.log(`clicked ${games[ansIdx]}`)
    )
    answersDisplay.append(button)
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
  return randomAnswers
}

function sortAnswersRandom(list) {
  return list.sort((a,b) => Math.floor(Math.random() * 2) - 1)
}

init()

let list = getRandomAnswers(0)
console.log('unsorted', list)
let sorted = sortAnswersRandom(list)
console.log('sorted', sorted)
