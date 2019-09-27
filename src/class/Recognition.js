import anime from 'animejs'
import io from 'socket.io-client'

import PaperApp from './PaperApp'

const server = 'https://speakinggg-server.herokuapp.com/'
let socket = io.connect(server)

const emit = (event, ...args) => {
  if (socket.connected) {
    socket.emit(event, ...args)
  } else {
    console.log('socket disconnected... Waiting for connection established.')
    socket.on('connect', () => {
      console.log('this.socket reconnected. Emitting...')
      socket.socket.connect()
      socket.emit(event, ...args)
    })
  }
}

const sendMessage = message => {
  emit('message new', message)
}

const last = array => array[array.length - 1]

export default class Recognition {
  constructor(
    langSelector,
    historyContainer,
    speechContainer,
    paperContainer,
    bbContainer,
  ) {
    window.SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition

    if (window.SpeechRecognition) {
      this.speechContainer = speechContainer
      this.paperContainer = paperContainer
      this.historyContainer = historyContainer
      this.bbContainer = bbContainer
      this.langSelector = langSelector
      this.lang = langSelector.value
      this.init()
    }
  }

  init() {
    this.recognition = new SpeechRecognition()
    // this.recognition.continuous = false;
    this.recognition.interimResult = true
    this.recognition.lang = this.lang

    this.log = []

    this.paper = new PaperApp(
      this.paperContainer,
      this.speechContainer.innerHTML,
    )

    this.text()

    const bb = [
      './assets/bb1.svg',
      './assets/bb2.svg',
      './assets/bb3.svg',
      './assets/bb4.svg',
    ]
    this.bbContainer.style.backgroundImage = `url('${
      bb[Math.floor(Math.random() * bb.length)]
    }')`

    this.events()
  }

  text(word) {
    anime
      .timeline({
        easing: 'easeInOutSine',
        duration: 400,
      })
      .add({
        targets: this.speechContainer,
        opacity: 0,
      })
      .add({
        targets: this.speechContainer,
        opacity: 1,
      })

    word = word ? word : this.speechContainer.innerHTML

    if (word.length <= 24) {
      const text = new Blotter.Text(word, {
        family: 'Open Sans',
        size:
          (window.innerWidth / 100) *
          word.length *
          (word.length > 10 ? 0.2 : 0.8),
        fill: '#fff',
        paddingLeft: 40,
        paddingRight: 40,
      })
      const material = new Blotter.LiquidDistortMaterial()
      material.uniforms.uVolatility.value = anime.random(0.04, 0.14)
      material.uniforms.uSeed.value = anime.random(0.2, 0.4)
      const blotter = new Blotter(material, { texts: text })
      const scope = blotter.forText(text)

      blotter.needsUpdate = true

      this.speechContainer.innerHTML = ''
      scope.appendTo(this.speechContainer)
    } else {
      this.speechContainer.innerHTML = word
    }
  }

  events() {
    this.onLangChange()
    this.onResult()
    this.onEnd()
    this.start()
    this.onKey()

    socket.on('connect', e => console.log(e))

    socket.on('messages update', ({ messages }) => {
      console.log(messages)
    })

    socket.on('message new', ({ message, messages }) => {
      console.log(messages, message)

      if (this.log.length < messages.length) {
        messages.forEach(m => this.updateLog(m, false))
      }
    })
  }

  onKey() {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 32) {
        this.clearLog()
      }
    })
  }

  onLangChange() {
    this.langSelector.addEventListener('change', e => {
      this.lang = e.target.value
      this.recognition.lang = this.lang
    })
  }

  onResult() {
    this.recognition.addEventListener('result', e => {
      this.updateLog(e)
      const message = last(this.log).transcript

      sendMessage(message)
      this.updateSpeech(message)
    })
  }

  onEnd() {
    this.recognition.addEventListener('end', this.start.bind(this))
  }

  start() {
    this.recognition.start()
  }

  clearLog() {
    this.log = [last(this.log)]
    this.historyContainer.innerHTML = ''
    this.appendToHistory(last(this.log))
  }

  updateLog(e, isCompletedData = true) {
    let data
    if (isCompletedData) {
      const results = Array.from(e.results).map(r => r[0])
      data = {
        lang: this.lang,
        timeStamp: e.timeStamp,
        confidence: results.map(r => r.confidence),
        transcript: results.map(r => r.transcript).join(),
      }
    } else {
      data = {
        timeStamp: e.created,
        transcript: e.text,
      }
    }

    this.log.push(data)
    this.appendToHistory(data)

    console.clear()
    console.table(this.log)
  }

  updateSpeech(sentences) {
    this.text(sentences)
    this.paper.update(sentences)
  }

  appendToHistory(data) {
    const p = document.createElement('p')

    p.innerHTML = data.transcript
    p.setAttribute('title', data.transcript)

    anime({
      targets: p,
      top: `${anime.random(10, 90)}%`,
      left: `${anime.random(10, 90)}%`,
      translateX: '-50%',
      translateY: '-50%',
      fontSize: `${anime.random(0.8, 2.2)}rem`,
      opacity: anime.random(0.1, 0.4),
      rotate: anime.random(0, 360),
    })

    this.historyContainer.append(p)
  }
}
