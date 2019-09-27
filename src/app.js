import anime from 'animejs'

import Recognition from './class/Recognition'
import AudioProcessing from './class/AudioProcessing'

class App {
  constructor(app) {
    this.root = document.querySelector(app)
    this.els = {
      speechContainer: this.root.querySelector(`${app}__speech`),
      bbContainer: this.root.querySelector(`${app}__bb`),
      paperContainer: this.root.querySelector(`${app}__paper`),
      historyContainer: this.root.querySelector(`${app}__history`),
      langContainer: this.root.querySelector(`${app}__lang select`),
      volumeContainer: this.root.querySelector(`${app}__volume`),
      noteContainer: this.root.querySelector(`${app}__note`),
      waveformContainer: this.root.querySelector(`${app}__waveform`),
    }

    this.init()

    window.addEventListener('mousedown', e => {
      // navigator.mediaDevices.getDisplayMedia().catch(e => console.log(e))
    })
  }

  init() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.initRecognition()

        this.initAudioProcessing(stream)
      })
      .catch(e => console.log(e))
  }

  initRecognition() {
    this.recognition = new Recognition(
      this.els.langContainer,
      this.els.historyContainer,
      this.els.speechContainer,
      this.els.paperContainer,
      this.els.bbContainer,
    )
  }

  initAudioProcessing(stream) {
    this.audioProcessing = new AudioProcessing(
      stream,
      this.els.volumeContainer,
      this.els.noteContainer,
      this.els.waveformContainer,
    )
  }
}

window.onload = () => {
  window.app = new App('.app')

  setTimeout(() => {
    anime({
      targets: document.querySelector('.app__overlay'),
      easing: 'easeOutSine',
      opacity: 0,
      scale: 0,
    })
  }, 4000)
}
