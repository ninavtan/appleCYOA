const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const emmaChamberlain = document.getElementById('emmaChamberlain')
let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
    
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You see a customer examining the camera of the iPhone 11 Pro.',
    options: [
      {
        text: "Hi, I see you're checking out the new iPhone 11 Pro. Have you checked out the triple camera system yet?",
        setState: { beingNice: true },
        nextText: 2
      },
      {
        text: "What's up! Do you know how to use that?",
        setState: { beingNice: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "'No, I'm trying to figure it out... Do all these bells and whistles really make a difference?'",
    options: [
      {
        text: 'Um yeah, duh!',
        requiredState: (currentState) => currentState.beingNice,
        setState: { beingNice: false},
        nextText: 4
      },
      {
        text: 'Yes, it’s a pretty large improvement from our past phones. What phone do you have now? We could compare the camera specs together.',
        requiredState: (currentState) => currentState.beingNice,
        setState: { beingNice: true },
        nextText: 3
      },
      
    ]
  },
  {
    id: 3,
    text: 'I have an iPhone 8+. The camera sucks! I feel like my pictures just don\'t look as crispy as everyone else\'s anymore, and the video quality isn\'t ideal.',
    options: [
      {
        text: 'Yeah, I get what you mean. The iPhone 11 Pro Camera has some pretty significant improvements, AND it shoots in 4K video. What situations do you find yourself in where you\'d like to record video?',
        nextText: 5
      },
      {
        text: 'Oh yeah, those things suck now! I don\'t advise anyone to buy anything older than an iPhone XR.',
        nextText: 4
      },
    ]  
  },
  {
    id: 4,
      text: 'Um, okay. Well, thanks for your help.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
  },
  {
    id: 5,
    text: 'I\'m a vlogger on Youtube. When I\'m in a pinch, I like to record on my phone instead of my vlogging camera.',
    options: [
      {
        text: 'Oh, cool! Yeah, the iPhone 11 Pro\'s triple lenses could be super handy for that too.',
        nextText: 6
      },
      {
        text: 'That\'s awesome! Yeah, even the front camera has significant improvements. The iPhone 8 Plus has a 7MP camera, while the iPhone 11 Pro has TrueDepth and a 12MP camera.',
        nextText: 6
      },
    ]  
  },
  {
    id: 6,
    text: 'So, um... what are my options for paying for this?',
    options: [
      {
        text: 'You definitely have options. Would you be interested in adding the monthly cost of the phone onto your phone bill? Or making payments independent of your carrier?',
        nextText: 7
      },
      {
        text: 'Most people buy outright.',
        nextText: 4
      },
    ]  
  },
  {
    id: 7,
    text: 'I\'d want to pay independently from my carrier in case I want to switch carriers.',
    options: [
      {
        text: 'Okay! You could pay through the iPhone Payment Plan or through Apple Card. The main difference is that with Apple Card, you\'d only have to get a hard credit check done once, and you\'d get immediate 3% cash back from your purchase.',
        nextText: 8
      },
      {
        text: 'I recommend Apple Card. You only have to perform a hard credit check once, and you\'ll get immediate cash back.',
        nextText: 8
      },
    ]  
  },
  {
    id: 8,
    text: 'Apple Card, huh? I don\'t really have time to apply for a new credit card.',
    options: [
      {
        text: 'No worries, you can apply right from your phone, and know in minutes if you\'re approved. Mind if we navigate to your Wallet app?',
        nextText: 9
      },
      {
        text: 'Well, it doesn\'t take more than a minute. Your loss!',
        nextText: 4
      },
    ]  
  },
  {
    id: 9,
    text: 'Sure. If I\'m going to be making payments on a phone, I might as well build good credit for it, right?',
    options: [
      {
        text: 'I totally agree. Let\'s do this!',
        nextText: 10
      },
      {
        text: 'Yep. AND get 3% cash back at other retailers like Uber, Nike, and Walgreens. AND get 2% cash back when you use Apple Card with Apple Pay!',
        nextText: 10
      },
    ]  
  },
  {
    id: 10,
    text: 'Thanks so much for your help! Maybe I\'ll shout you out in my next vlog!',
    options: [
      {
        text: 'OMG that would be wild. Have a great day!',
        nextText: 11
      },
      {
        text: 'COOL!!',
        nextText: 11
      },
    ]  
  },
  {
    id: 11,
    text: 'You won!',
  },
  
]

startGame()