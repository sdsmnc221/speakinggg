import randomColor from 'randomcolor'
import anime from 'animejs'

export default class Waveform {
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
