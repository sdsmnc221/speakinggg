import Waveform from './Waveform'

export default class AudioProcessing {
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
