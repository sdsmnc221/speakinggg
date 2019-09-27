import randomColor from 'randomcolor'
import anime from 'animejs'
import paper, { Point, PointText, Path, Tool, project } from 'paper'
import io from 'socket.io-client'

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

const colorsArray = nb => {
  const array = []
  for (let i = 0; i < nb; i++) {
    array.push(randomColor())
  }
  return array
}

const random = (min, max, round = true) => {
  // min and max included
  const result = Math.random() * (max - min + 1) + min
  return round ? Math.floor(result) : result
}

class PaperApp {
  constructor(container, word) {
    this.container = container
    this.word = word

    this.init()
  }

  init() {
    paper.setup(this.container)

    this.vw = window.innerWidth / 100
    this.tool = new Tool()
    this.path = new Path()
    this.points = this.word.length
    this.length = this.word.length
    this.start = new paper.Point(
      paper.view.center._x / 2,
      paper.view.center._y / 2,
    )

    this.tool.onMouseMove = this.onMouseMove.bind(this)
    this.tool.activate()
  }

  update(word) {
    this.word = word
    this.points = this.word.length
    this.length = this.word.length
    this.path = new Path()
  }

  onMouseMove(event) {
    project.clear()

    for (let i = 0; i < this.points; i++) {
      this.path.add(
        new paper.Point(this.start.x + this.length * i, this.start.y),
      )
    }

    this.path.firstSegment.point = event ? event.point : this.start
    for (let i = 0; i < this.points - 1; i++) {
      const segment = this.path.segments[i]
      const nextSegment = segment.next
      const vector = new paper.Point(
        segment.point.x - nextSegment.point.x,
        segment.point.y - nextSegment.point.y,
      )
      vector.length = length
      nextSegment.point = new paper.Point(
        segment.point.x - vector.x,
        segment.point.y - vector.y,
      )
    }

    this.path.strokeColor = '#fff'
    this.path.smooth({ type: 'continuous' })

    if (window.innerWidth <= 900) {
      this.alignedText(this.word, this.path, {
        fontSize: this.vw * 6,
        fontFamily: 'Open Sans',
      })
    } else {
      this.alignedText(this.word, this.path, {
        fontSize: this.vw * 8,
        fontFamily: 'Open Sans',
      })
    }
  }

  pointText(str, style) {
    const text = new PointText()
    text.content = str
    text.fillColor = '#fff'
    text.blendMode = 'difference'
    if (style) {
      if (style.font) text.font = style.font
      if (style.fontFamily) text.fontFamily = style.fontFamily
      if (style.fontSize) text.fontSize = style.fontSize
      if (style.fontWeight) text.fontWeight = style.fontWeight
    }
    return text
  }

  alignedText(str, path, style) {
    if (str && str.length > 0 && path) {
      // create PointText object for each glyph
      var glyphTexts = []
      for (let i = 0; i < str.length; i++) {
        glyphTexts[i] = this.pointText(str.substring(i, i + 1), style)
        glyphTexts[i].justification = 'center'
      }
      // for each glyph find center xOffset
      let xOffsets = [0]
      for (let i = 1; i < str.length; i++) {
        const pairText = this.pointText(str.substring(i - 1, i + 1), style)
        // pairText.remove()
        xOffsets[i] =
          xOffsets[i - 1] +
          pairText.bounds.width +
          glyphTexts[i - 1].bounds.width / 2 -
          glyphTexts[i].bounds.width / 2
      }
      // set point for each glyph and rotate glyph around the point
      for (let i = 0; i < str.length; i++) {
        let centerOffs = xOffsets[i]
        if (path.length < centerOffs) {
          if (path.closed) {
            centerOffs = centerOffs % path.length
          } else {
            centerOffs = undefined
          }
        }
        if (centerOffs === undefined) {
          glyphTexts[i].remove()
        } else {
          const pathPoint = path.getPointAt(centerOffs)
          glyphTexts[i].point = pathPoint
          const tan = path.getTangentAt(centerOffs)
          glyphTexts[i].rotate(tan.angle, pathPoint)
        }
      }
    }
  }
}

class Recognition {
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
          (word.length > 10 ? 0.5 : 1),
        fill: '#fff',
        paddingLeft: 40,
        paddingRight: 40,
      })
      const material = new Blotter.LiquidDistortMaterial()
      material.uniforms.uVolatility.value = anime.random(0.04, 0.2)
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

class Waveform {
  constructor(sound, container) {
    this.sound = sound
    this.container = container
    this.config = {
      spectrumColors: randomColor({ count: 512, hue: 'blue' }),
      bgColors: {
        red: randomColor({ count: 3, hue: 'red' }),
        orange: randomColor({ count: 3, hue: 'orange' }),
        yellow: randomColor({ count: 3, hue: 'yellow' }),
        green: randomColor({ count: 3, hue: 'green' }),
        blue: randomColor({ count: 3, hue: 'blue' }),
        purple: randomColor({ count: 3, hue: 'purple' }),
        pink: randomColor({ count: 3, hue: 'pink' }),
      },
      borderHeight: 0,
    }

    Object.keys(this.config.bgColors).forEach(bg => {
      const div = document.createElement('div')

      div.classList.add('app__waveform__bg', `bg--${bg}`)
      div.style.background = `linear-gradient(-60deg, ${this.config.bgColors[
        bg
      ].join(' ,')})`
      div.style.opacity = bg === 'blue' ? 1 : 0

      this.container.appendChild(div)
    })

    this.canvas = document.createElement('canvas')
    this.canvas.width = 512
    this.canvas.height = 300
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()
  }

  updateConfig(hue) {
    if (hue === undefined) {
      hue = 'blue'
    }

    this.config.spectrumColors = randomColor({ count: 512, hue })

    const bg = this.container.querySelector(`.bg--${hue}`)
    const rest = this.container.querySelectorAll(`.app__waveform__bg`)

    anime
      .timeline({
        easing: 'easeInOutSine',
        duration: 400,
      })
      .add({
        targets: rest,
        opacity: 0,
      })
      .add(
        {
          targets: bg,
          opacity: 1,
        },
        0,
      )
  }

  resize() {
    this.canvas.width = window.innerWidth
  }

  draw() {
    const spectrum = this.sound.getSpectrum()
    const waveform = this.sound.getWaveform()
    this.config = {
      ...this.config,
      spectrum,
      waveform,
      spectrumLength: spectrum.length,
      waveformLength: waveform.length,
    }

    this.background()

    this.spectrum()

    this.waveform()

    // draw frequency
    // this.ctx.beginPath();
    // this.ctx.font = '10px Arial';
    // this.ctx.textBaseline = 'middle';
    // this.ctx.textAlign = 'left';
    // for (let i = 0, len = spectrumLength; i < len; i++) {
    //   if (i % 10 == 0) {
    //     this.ctx.rect(
    //       i * spectrumWidth,
    //       spectrumHeight,
    //       spectrumWidth / 2,
    //       borderHeight
    //     );
    //     this.ctx.fillText(
    //       i,
    //       i * spectrumWidth + 4,
    //       spectrumHeight + borderHeight * 0.5
    //     );
    //   }
    // }
    // this.ctx.fillStyle = '#ffffff';
    // this.ctx.fill();

    // draw time
    // this.ctx.beginPath();
    // this.ctx.textAlign = 'right';
    // this.ctx.textBaseline = 'top';
    // this.ctx.font = '15px Arial';
    // this.ctx.fillStyle = '#ffffff';
    // this.ctx.fillText(
    //   Math.round(this.sound.time * 10) / 10 +
    //     ' / ' +
    //     Math.round(this.sound.duration * 10) / 10,
    //   this.canvas.width - 5,
    //   5
    // );
  }

  background() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.beginPath()
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
  }

  spectrum() {
    const {
      spectrum,
      spectrumLength,
      spectrumColors,
      borderHeight,
    } = this.config
    const spectrumWidth = this.canvas.width / spectrumLength
    const spectrumHeight = this.canvas.height - borderHeight
    let spectrumValue = null

    spectrum.forEach((s, i) => {
      this.ctx.beginPath()
      spectrumValue = s / 256
      this.ctx.rect(
        i * spectrumWidth,
        spectrumHeight - spectrumHeight * spectrumValue,
        spectrumWidth / 2,
        spectrumHeight * spectrumValue,
      )
      this.ctx.fillStyle = spectrumColors[i]
      this.ctx.fill()
    })
  }

  waveform() {
    const { waveform, waveformLength, borderHeight } = this.config
    const waveformWidth = this.canvas.width / waveformLength
    const waveformHeight = this.canvas.height - borderHeight
    let waveformValue = null

    this.ctx.beginPath()

    waveform.forEach((w, i) => {
      waveformValue = w / 256
      if (i == 0)
        this.ctx.moveTo(i * waveformWidth, waveformHeight * waveformValue)
      else this.ctx.lineTo(i * waveformWidth, waveformHeight * waveformValue)
    })

    this.ctx.strokeStyle = '#0000ff'
    this.ctx.stroke()
  }
}

class AudioProcessing {
  constructor(stream, volumeContainer, noteContainer, waveformContainer) {
    this.volumeContainer = volumeContainer
    this.noteContainer = noteContainer
    this.waveform = new Waveform(this, waveformContainer)

    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.micInput = this.audioContext.createMediaStreamSource(stream)
    this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1)

    this.analyser.smoothingTimeConstant = 0.8
    this.analyser.fftSize = 512

    this.micInput.connect(this.analyser)
    this.analyser.connect(this.scriptProcessor)
    this.scriptProcessor.connect(this.audioContext.destination)

    this.scriptProcessor.onaudioprocess = this.audioProcess.bind(this)
  }

  audioProcess() {
    const streamData = new Uint8Array(this.analyser.frequencyBinCount)

    this.analyser.getByteFrequencyData(streamData)
    const average = this.getAverageVolume(streamData)

    this.volumeContainer.innerHTML = average
    this.waveform.draw()

    const note = this.getNoteFromPitch(this.getNoteNbFromPitch(average))
    this.noteContainer.innerHTML = note ? note : ''

    const hue = this.getHueFromNote(note)
    this.waveform.updateConfig(hue)
  }

  getSpectrum() {
    const streamData = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteFrequencyData(streamData)

    return streamData
  }

  getWaveform() {
    const streamData = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(streamData)

    return streamData
  }

  getFrequency(freq, endFreq = null) {
    let sum = 0
    let spectrum = this.getSpectrum()
    if (endFreq !== undefined) {
      for (let i = freq; i <= endFreq; i++) {
        sum += spectrum[i]
      }
      return sum / (endFreq - freq + 1)
    } else {
      return spectrum[freq]
    }
  }

  getAverageVolume(frequencies) {
    let values = 0
    frequencies.forEach(v => (values += v))

    const average = values / frequencies.length

    return average
  }

  getNoteNbFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
    return Math.round(noteNum) + 69
  }

  getNoteFromPitch(noteNb) {
    const notes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ]
    return notes[noteNb % 12]
  }

  getHueFromNote(note) {
    const hue = {
      C: 'red',
      'C#': 'red',
      D: 'orange',
      'D#': 'orange',
      E: 'yellow',
      F: 'green',
      'F#': 'green',
      G: 'blue',
      'G#': 'blue',
      A: 'purple',
      'A#': 'purple',
      B: 'pink',
    }
    return hue[note]
  }

  getFrequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12)
  }

  getCentsOffFromPitch(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / this.frequencyFromNoteNumber(note))) /
        Math.log(2),
    )
  }
}

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

window.onload = () => (window.app = new App('.app'))
