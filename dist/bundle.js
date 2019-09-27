/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var last = function last(array) {
  return array[array.length - 1];
};

var colorsArray = function colorsArray(nb) {
  var array = [];

  for (var i = 0; i < nb; i++) {
    array.push(randomColor());
  }

  return array;
};

var random = function random(min, max) {
  var round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // min and max included
  var result = Math.random() * (max - min + 1) + min;
  return round ? Math.floor(result) : result;
};

var Recognition =
/*#__PURE__*/
function () {
  function Recognition(langSelector, historyContainer, speechContainer) {
    _classCallCheck(this, Recognition);

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;

    if (window.SpeechRecognition) {
      this.speechContainer = speechContainer;
      this.historyContainer = historyContainer;
      this.langSelector = langSelector;
      this.lang = langSelector.value;
      this.init();
    }
  }

  _createClass(Recognition, [{
    key: "init",
    value: function init() {
      this.recognition = new SpeechRecognition(); // this.recognition.continuous = false;

      this.recognition.interimResult = true;
      this.recognition.lang = this.lang;
      this.log = [];
      this.events();
    }
  }, {
    key: "events",
    value: function events() {
      this.onLangChange();
      this.onResult();
      this.onEnd();
      this.start();
    }
  }, {
    key: "onLangChange",
    value: function onLangChange() {
      var _this = this;

      this.langSelector.addEventListener('change', function (e) {
        _this.lang = e.target.value;
        _this.recognition.lang = _this.lang;
      });
    }
  }, {
    key: "onResult",
    value: function onResult() {
      var _this2 = this;

      this.recognition.addEventListener('result', function (e) {
        _this2.updateLog(e);

        _this2.updateSpeech(last(_this2.log).transcript);
      });
    }
  }, {
    key: "onEnd",
    value: function onEnd() {
      this.recognition.addEventListener('end', this.start.bind(this));
    }
  }, {
    key: "start",
    value: function start() {
      this.recognition.start();
    }
  }, {
    key: "updateLog",
    value: function updateLog(e) {
      var results = Array.from(e.results).map(function (r) {
        return r[0];
      });
      var data = {
        lang: this.lang,
        timeStamp: e.timeStamp,
        confidence: results.map(function (r) {
          return r.confidence;
        }),
        transcript: results.map(function (r) {
          return r.transcript;
        }).join()
      };
      this.log.push(data);
      this.appendToHistory(data);
      console.clear();
      console.table(this.log);
    }
  }, {
    key: "updateSpeech",
    value: function updateSpeech(sentences) {
      this.speechContainer.innerHTML = sentences;
    }
  }, {
    key: "appendToHistory",
    value: function appendToHistory(data) {
      var p = document.createElement('p');
      p.innerHTML = data.transcript;
      p.setAttribute('title', data.transcript);
      anime({
        targets: p,
        top: "".concat(anime.random(10, 90), "%"),
        left: "".concat(anime.random(10, 90), "%"),
        translateX: '-50%',
        translateY: '-50%',
        fontSize: "".concat(anime.random(1.2, 4.2), "rem"),
        opacity: anime.random(0.1, 0.5),
        rotate: anime.random(0, 360)
      });
      this.historyContainer.append(p);
    }
  }]);

  return Recognition;
}();

var Waveform =
/*#__PURE__*/
function () {
  function Waveform(sound, container) {
    _classCallCheck(this, Waveform);

    this.sound = sound;
    this.container = container;
    this.config = {
      spectrumColors: randomColor({
        count: 512,
        hue: 'blue'
      }),
      borderHeight: 0
    };
    this.canvas = document.createElement('canvas');
    this.canvas.width = 512;
    this.canvas.height = 300;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  _createClass(Waveform, [{
    key: "resize",
    value: function resize() {
      this.canvas.width = window.innerWidth;
    }
  }, {
    key: "draw",
    value: function draw() {
      var spectrum = this.sound.getSpectrum();
      var waveform = this.sound.getWaveform();
      this.config = _objectSpread({}, this.config, {
        spectrum: spectrum,
        waveform: waveform,
        spectrumLength: spectrum.length,
        waveformLength: waveform.length
      });
      this.background();
      this.spectrum();
      this.waveform(); // draw frequency
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
  }, {
    key: "background",
    value: function background() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "spectrum",
    value: function spectrum() {
      var _this3 = this;

      var _this$config = this.config,
          spectrum = _this$config.spectrum,
          spectrumLength = _this$config.spectrumLength,
          spectrumColors = _this$config.spectrumColors,
          borderHeight = _this$config.borderHeight;
      var spectrumWidth = this.canvas.width / spectrumLength;
      var spectrumHeight = this.canvas.height - borderHeight;
      var spectrumValue = null;
      spectrum.forEach(function (s, i) {
        _this3.ctx.beginPath();

        spectrumValue = s / 256;

        _this3.ctx.rect(i * spectrumWidth, spectrumHeight - spectrumHeight * spectrumValue, spectrumWidth / 2, spectrumHeight * spectrumValue);

        _this3.ctx.fillStyle = spectrumColors[i];

        _this3.ctx.fill();
      });
    }
  }, {
    key: "waveform",
    value: function waveform() {
      var _this4 = this;

      var _this$config2 = this.config,
          waveform = _this$config2.waveform,
          waveformLength = _this$config2.waveformLength,
          borderHeight = _this$config2.borderHeight;
      var waveformWidth = this.canvas.width / waveformLength;
      var waveformHeight = this.canvas.height - borderHeight;
      var waveformValue = null;
      this.ctx.beginPath();
      waveform.forEach(function (w, i) {
        waveformValue = w / 256;
        if (i == 0) _this4.ctx.moveTo(i * waveformWidth, waveformHeight * waveformValue);else _this4.ctx.lineTo(i * waveformWidth, waveformHeight * waveformValue);
      });
      this.ctx.strokeStyle = '#0000ff';
      this.ctx.stroke();
    }
  }]);

  return Waveform;
}();

var AudioProcessing =
/*#__PURE__*/
function () {
  function AudioProcessing(stream, volumeContainer, waveformContainer) {
    _classCallCheck(this, AudioProcessing);

    this.volumeContainer = volumeContainer;
    this.waveform = new Waveform(this, waveformContainer);
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.micInput = this.audioContext.createMediaStreamSource(stream);
    this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    this.analyser.smoothingTimeConstant = 0.8;
    this.analyser.fftSize = 512;
    this.micInput.connect(this.analyser);
    this.analyser.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.audioContext.destination);
    this.scriptProcessor.onaudioprocess = this.audioProcess.bind(this);
  }

  _createClass(AudioProcessing, [{
    key: "audioProcess",
    value: function audioProcess() {
      var streamData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(streamData);
      var average = this.getAverageVolume(streamData);
      this.volumeContainer.innerHTML = average;
      this.waveform.draw();
    }
  }, {
    key: "getSpectrum",
    value: function getSpectrum() {
      var streamData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(streamData);
      return streamData;
    }
  }, {
    key: "getWaveform",
    value: function getWaveform() {
      var streamData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteTimeDomainData(streamData);
      return streamData;
    }
  }, {
    key: "getFrequency",
    value: function getFrequency(freq) {
      var endFreq = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var sum = 0;
      var spectrum = this.getSpectrum();

      if (endFreq !== undefined) {
        for (var i = freq; i <= endFreq; i++) {
          sum += spectrum[i];
        }

        return sum / (endFreq - freq + 1);
      } else {
        return spectrum[freq];
      }
    }
  }, {
    key: "getAverageVolume",
    value: function getAverageVolume(frequencies) {
      var values = 0;
      frequencies.forEach(function (v) {
        return values += v;
      });
      var average = values / frequencies.length;
      return average;
    }
  }, {
    key: "getNoteNbFromPitch",
    value: function getNoteNbFromPitch(frequency) {
      var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
      return Math.round(noteNum) + 69;
    }
  }, {
    key: "getNoteFromPitch",
    value: function getNoteFromPitch(noteNb) {
      var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      return notes[noteNb % 12];
    }
  }, {
    key: "getFrequencyFromNoteNumber",
    value: function getFrequencyFromNoteNumber(note) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }
  }, {
    key: "getCentsOffFromPitch",
    value: function getCentsOffFromPitch(frequency, note) {
      return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    }
  }]);

  return AudioProcessing;
}();

var App =
/*#__PURE__*/
function () {
  function App(app) {
    _classCallCheck(this, App);

    this.root = document.querySelector(app);
    this.els = {
      speechContainer: this.root.querySelector("".concat(app, "__speech")),
      historyContainer: this.root.querySelector("".concat(app, "__history")),
      langContainer: this.root.querySelector("".concat(app, "__lang select")),
      volumeContainer: this.root.querySelector("".concat(app, "__volume")),
      waveformContainer: this.root.querySelector("".concat(app, "__waveform"))
    };
    this.init();
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var _this5 = this;

      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(function (stream) {
        _this5.initRecognition();

        _this5.initAudioProcessing(stream);
      })["catch"](function (e) {
        return console.log(e);
      });
    }
  }, {
    key: "initRecognition",
    value: function initRecognition() {
      this.recognition = new Recognition(this.els.langContainer, this.els.historyContainer, this.els.speechContainer);
    }
  }, {
    key: "initAudioProcessing",
    value: function initAudioProcessing(stream) {
      this.audioProcessing = new AudioProcessing(stream, this.els.volumeContainer, this.els.waveformContainer);
    }
  }]);

  return App;
}();

window.app = new App('.app');

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyJdLCJuYW1lcyI6WyJsYXN0IiwiYXJyYXkiLCJsZW5ndGgiLCJjb2xvcnNBcnJheSIsIm5iIiwiaSIsInB1c2giLCJyYW5kb21Db2xvciIsInJhbmRvbSIsIm1pbiIsIm1heCIsInJvdW5kIiwicmVzdWx0IiwiTWF0aCIsImZsb29yIiwiUmVjb2duaXRpb24iLCJsYW5nU2VsZWN0b3IiLCJoaXN0b3J5Q29udGFpbmVyIiwic3BlZWNoQ29udGFpbmVyIiwid2luZG93IiwiU3BlZWNoUmVjb2duaXRpb24iLCJ3ZWJraXRTcGVlY2hSZWNvZ25pdGlvbiIsIm1velNwZWVjaFJlY29nbml0aW9uIiwibXNTcGVlY2hSZWNvZ25pdGlvbiIsIm9TcGVlY2hSZWNvZ25pdGlvbiIsImxhbmciLCJ2YWx1ZSIsImluaXQiLCJyZWNvZ25pdGlvbiIsImludGVyaW1SZXN1bHQiLCJsb2ciLCJldmVudHMiLCJvbkxhbmdDaGFuZ2UiLCJvblJlc3VsdCIsIm9uRW5kIiwic3RhcnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInVwZGF0ZUxvZyIsInVwZGF0ZVNwZWVjaCIsInRyYW5zY3JpcHQiLCJiaW5kIiwicmVzdWx0cyIsIkFycmF5IiwiZnJvbSIsIm1hcCIsInIiLCJkYXRhIiwidGltZVN0YW1wIiwiY29uZmlkZW5jZSIsImpvaW4iLCJhcHBlbmRUb0hpc3RvcnkiLCJjb25zb2xlIiwiY2xlYXIiLCJ0YWJsZSIsInNlbnRlbmNlcyIsImlubmVySFRNTCIsInAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhbmltZSIsInRhcmdldHMiLCJ0b3AiLCJsZWZ0IiwidHJhbnNsYXRlWCIsInRyYW5zbGF0ZVkiLCJmb250U2l6ZSIsIm9wYWNpdHkiLCJyb3RhdGUiLCJhcHBlbmQiLCJXYXZlZm9ybSIsInNvdW5kIiwiY29udGFpbmVyIiwiY29uZmlnIiwic3BlY3RydW1Db2xvcnMiLCJjb3VudCIsImh1ZSIsImJvcmRlckhlaWdodCIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJjdHgiLCJnZXRDb250ZXh0IiwicmVzaXplIiwiaW5uZXJXaWR0aCIsInNwZWN0cnVtIiwiZ2V0U3BlY3RydW0iLCJ3YXZlZm9ybSIsImdldFdhdmVmb3JtIiwic3BlY3RydW1MZW5ndGgiLCJ3YXZlZm9ybUxlbmd0aCIsImJhY2tncm91bmQiLCJjbGVhclJlY3QiLCJiZWdpblBhdGgiLCJyZWN0Iiwic3BlY3RydW1XaWR0aCIsInNwZWN0cnVtSGVpZ2h0Iiwic3BlY3RydW1WYWx1ZSIsImZvckVhY2giLCJzIiwiZmlsbFN0eWxlIiwiZmlsbCIsIndhdmVmb3JtV2lkdGgiLCJ3YXZlZm9ybUhlaWdodCIsIndhdmVmb3JtVmFsdWUiLCJ3IiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlU3R5bGUiLCJzdHJva2UiLCJBdWRpb1Byb2Nlc3NpbmciLCJzdHJlYW0iLCJ2b2x1bWVDb250YWluZXIiLCJ3YXZlZm9ybUNvbnRhaW5lciIsImF1ZGlvQ29udGV4dCIsIkF1ZGlvQ29udGV4dCIsImFuYWx5c2VyIiwiY3JlYXRlQW5hbHlzZXIiLCJtaWNJbnB1dCIsImNyZWF0ZU1lZGlhU3RyZWFtU291cmNlIiwic2NyaXB0UHJvY2Vzc29yIiwiY3JlYXRlU2NyaXB0UHJvY2Vzc29yIiwic21vb3RoaW5nVGltZUNvbnN0YW50IiwiZmZ0U2l6ZSIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsIm9uYXVkaW9wcm9jZXNzIiwiYXVkaW9Qcm9jZXNzIiwic3RyZWFtRGF0YSIsIlVpbnQ4QXJyYXkiLCJmcmVxdWVuY3lCaW5Db3VudCIsImdldEJ5dGVGcmVxdWVuY3lEYXRhIiwiYXZlcmFnZSIsImdldEF2ZXJhZ2VWb2x1bWUiLCJkcmF3IiwiZ2V0Qnl0ZVRpbWVEb21haW5EYXRhIiwiZnJlcSIsImVuZEZyZXEiLCJzdW0iLCJ1bmRlZmluZWQiLCJmcmVxdWVuY2llcyIsInZhbHVlcyIsInYiLCJmcmVxdWVuY3kiLCJub3RlTnVtIiwibm90ZU5iIiwibm90ZXMiLCJub3RlIiwicG93IiwiZnJlcXVlbmN5RnJvbU5vdGVOdW1iZXIiLCJBcHAiLCJhcHAiLCJyb290IiwicXVlcnlTZWxlY3RvciIsImVscyIsImxhbmdDb250YWluZXIiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsInRoZW4iLCJpbml0UmVjb2duaXRpb24iLCJpbml0QXVkaW9Qcm9jZXNzaW5nIiwiYXVkaW9Qcm9jZXNzaW5nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBTUEsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0EsS0FBSyxDQUFDQyxNQUFOLEdBQWUsQ0FBaEIsQ0FBVDtBQUFBLENBQWxCOztB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RDs7O3NDQUVpQjtBQUNoQixXQUFLVCxXQUFMLEdBQW1CLElBQUliLFdBQUosQ0FDakIsS0FBSzhJLEdBQUwsQ0FBU0MsYUFEUSxFQUVqQixLQUFLRCxHQUFMLENBQVM1SSxnQkFGUSxFQUdqQixLQUFLNEksR0FBTCxDQUFTM0ksZUFIUSxDQUFuQjtBQUtEOzs7d0NBRW1CZ0csTSxFQUFRO0FBQzFCLFdBQUtvRCxlQUFMLEdBQXVCLElBQUlyRCxlQUFKLENBQ3JCQyxNQURxQixFQUVyQixLQUFLMkMsR0FBTCxDQUFTMUMsZUFGWSxFQUdyQixLQUFLMEMsR0FBTCxDQUFTekMsaUJBSFksQ0FBdkI7QUFLRDs7Ozs7O0FBR0hqRyxNQUFNLENBQUN1SSxHQUFQLEdBQWEsSUFBSUQsR0FBSixDQUFRLE1BQVIsQ0FBYixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC5qc1wiKTtcbiIsImNvbnN0IGxhc3QgPSBhcnJheSA9PiBhcnJheVthcnJheS5sZW5ndGggLSAxXVxuXG5jb25zdCBjb2xvcnNBcnJheSA9IG5iID0+IHtcbiAgY29uc3QgYXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5iOyBpKyspIHtcbiAgICBhcnJheS5wdXNoKHJhbmRvbUNvbG9yKCkpXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmNvbnN0IHJhbmRvbSA9IChtaW4sIG1heCwgcm91bmQgPSB0cnVlKSA9PiB7XG4gIC8vIG1pbiBhbmQgbWF4IGluY2x1ZGVkXG4gIGNvbnN0IHJlc3VsdCA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW5cbiAgcmV0dXJuIHJvdW5kID8gTWF0aC5mbG9vcihyZXN1bHQpIDogcmVzdWx0XG59XG5cbmNsYXNzIFJlY29nbml0aW9uIHtcbiAgY29uc3RydWN0b3IobGFuZ1NlbGVjdG9yLCBoaXN0b3J5Q29udGFpbmVyLCBzcGVlY2hDb250YWluZXIpIHtcbiAgICB3aW5kb3cuU3BlZWNoUmVjb2duaXRpb24gPVxuICAgICAgd2luZG93LlNwZWVjaFJlY29nbml0aW9uIHx8XG4gICAgICB3aW5kb3cud2Via2l0U3BlZWNoUmVjb2duaXRpb24gfHxcbiAgICAgIHdpbmRvdy5tb3pTcGVlY2hSZWNvZ25pdGlvbiB8fFxuICAgICAgd2luZG93Lm1zU3BlZWNoUmVjb2duaXRpb24gfHxcbiAgICAgIHdpbmRvdy5vU3BlZWNoUmVjb2duaXRpb25cblxuICAgIGlmICh3aW5kb3cuU3BlZWNoUmVjb2duaXRpb24pIHtcbiAgICAgIHRoaXMuc3BlZWNoQ29udGFpbmVyID0gc3BlZWNoQ29udGFpbmVyXG4gICAgICB0aGlzLmhpc3RvcnlDb250YWluZXIgPSBoaXN0b3J5Q29udGFpbmVyXG4gICAgICB0aGlzLmxhbmdTZWxlY3RvciA9IGxhbmdTZWxlY3RvclxuICAgICAgdGhpcy5sYW5nID0gbGFuZ1NlbGVjdG9yLnZhbHVlXG4gICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpXG4gICAgLy8gdGhpcy5yZWNvZ25pdGlvbi5jb250aW51b3VzID0gZmFsc2U7XG4gICAgdGhpcy5yZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0ID0gdHJ1ZVxuICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9IHRoaXMubGFuZ1xuXG4gICAgdGhpcy5sb2cgPSBbXVxuXG4gICAgdGhpcy5ldmVudHMoKVxuICB9XG5cbiAgZXZlbnRzKCkge1xuICAgIHRoaXMub25MYW5nQ2hhbmdlKClcbiAgICB0aGlzLm9uUmVzdWx0KClcbiAgICB0aGlzLm9uRW5kKClcbiAgICB0aGlzLnN0YXJ0KClcbiAgfVxuXG4gIG9uTGFuZ0NoYW5nZSgpIHtcbiAgICB0aGlzLmxhbmdTZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMubGFuZyA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICB0aGlzLnJlY29nbml0aW9uLmxhbmcgPSB0aGlzLmxhbmdcbiAgICB9KVxuICB9XG5cbiAgb25SZXN1bHQoKSB7XG4gICAgdGhpcy5yZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKCdyZXN1bHQnLCBlID0+IHtcbiAgICAgIHRoaXMudXBkYXRlTG9nKGUpXG4gICAgICB0aGlzLnVwZGF0ZVNwZWVjaChsYXN0KHRoaXMubG9nKS50cmFuc2NyaXB0KVxuICAgIH0pXG4gIH1cblxuICBvbkVuZCgpIHtcbiAgICB0aGlzLnJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZCcsIHRoaXMuc3RhcnQuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKVxuICB9XG5cbiAgdXBkYXRlTG9nKGUpIHtcbiAgICBjb25zdCByZXN1bHRzID0gQXJyYXkuZnJvbShlLnJlc3VsdHMpLm1hcChyID0+IHJbMF0pXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxhbmc6IHRoaXMubGFuZyxcbiAgICAgIHRpbWVTdGFtcDogZS50aW1lU3RhbXAsXG4gICAgICBjb25maWRlbmNlOiByZXN1bHRzLm1hcChyID0+IHIuY29uZmlkZW5jZSksXG4gICAgICB0cmFuc2NyaXB0OiByZXN1bHRzLm1hcChyID0+IHIudHJhbnNjcmlwdCkuam9pbigpLFxuICAgIH1cblxuICAgIHRoaXMubG9nLnB1c2goZGF0YSlcbiAgICB0aGlzLmFwcGVuZFRvSGlzdG9yeShkYXRhKVxuXG4gICAgY29uc29sZS5jbGVhcigpXG4gICAgY29uc29sZS50YWJsZSh0aGlzLmxvZylcbiAgfVxuXG4gIHVwZGF0ZVNwZWVjaChzZW50ZW5jZXMpIHtcbiAgICB0aGlzLnNwZWVjaENvbnRhaW5lci5pbm5lckhUTUwgPSBzZW50ZW5jZXNcbiAgfVxuXG4gIGFwcGVuZFRvSGlzdG9yeShkYXRhKSB7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXG4gICAgcC5pbm5lckhUTUwgPSBkYXRhLnRyYW5zY3JpcHRcbiAgICBwLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBkYXRhLnRyYW5zY3JpcHQpXG5cbiAgICBhbmltZSh7XG4gICAgICB0YXJnZXRzOiBwLFxuICAgICAgdG9wOiBgJHthbmltZS5yYW5kb20oMTAsIDkwKX0lYCxcbiAgICAgIGxlZnQ6IGAke2FuaW1lLnJhbmRvbSgxMCwgOTApfSVgLFxuICAgICAgdHJhbnNsYXRlWDogJy01MCUnLFxuICAgICAgdHJhbnNsYXRlWTogJy01MCUnLFxuICAgICAgZm9udFNpemU6IGAke2FuaW1lLnJhbmRvbSgxLjIsIDQuMil9cmVtYCxcbiAgICAgIG9wYWNpdHk6IGFuaW1lLnJhbmRvbSgwLjEsIDAuNSksXG4gICAgICByb3RhdGU6IGFuaW1lLnJhbmRvbSgwLCAzNjApLFxuICAgIH0pXG5cbiAgICB0aGlzLmhpc3RvcnlDb250YWluZXIuYXBwZW5kKHApXG4gIH1cbn1cblxuY2xhc3MgV2F2ZWZvcm0ge1xuICBjb25zdHJ1Y3Rvcihzb3VuZCwgY29udGFpbmVyKSB7XG4gICAgdGhpcy5zb3VuZCA9IHNvdW5kXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIHNwZWN0cnVtQ29sb3JzOiByYW5kb21Db2xvcih7IGNvdW50OiA1MTIsIGh1ZTogJ2JsdWUnIH0pLFxuICAgICAgYm9yZGVySGVpZ2h0OiAwLFxuICAgIH1cblxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDUxMlxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDMwMFxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKVxuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplLmJpbmQodGhpcyksIGZhbHNlKVxuICAgIHRoaXMucmVzaXplKClcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gIH1cblxuICBkcmF3KCkge1xuICAgIGNvbnN0IHNwZWN0cnVtID0gdGhpcy5zb3VuZC5nZXRTcGVjdHJ1bSgpXG4gICAgY29uc3Qgd2F2ZWZvcm0gPSB0aGlzLnNvdW5kLmdldFdhdmVmb3JtKClcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIC4uLnRoaXMuY29uZmlnLFxuICAgICAgc3BlY3RydW0sXG4gICAgICB3YXZlZm9ybSxcbiAgICAgIHNwZWN0cnVtTGVuZ3RoOiBzcGVjdHJ1bS5sZW5ndGgsXG4gICAgICB3YXZlZm9ybUxlbmd0aDogd2F2ZWZvcm0ubGVuZ3RoLFxuICAgIH1cblxuICAgIHRoaXMuYmFja2dyb3VuZCgpXG5cbiAgICB0aGlzLnNwZWN0cnVtKClcblxuICAgIHRoaXMud2F2ZWZvcm0oKVxuXG4gICAgLy8gZHJhdyBmcmVxdWVuY3lcbiAgICAvLyB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAvLyB0aGlzLmN0eC5mb250ID0gJzEwcHggQXJpYWwnO1xuICAgIC8vIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIC8vIHRoaXMuY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAvLyBmb3IgKGxldCBpID0gMCwgbGVuID0gc3BlY3RydW1MZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIC8vICAgaWYgKGkgJSAxMCA9PSAwKSB7XG4gICAgLy8gICAgIHRoaXMuY3R4LnJlY3QoXG4gICAgLy8gICAgICAgaSAqIHNwZWN0cnVtV2lkdGgsXG4gICAgLy8gICAgICAgc3BlY3RydW1IZWlnaHQsXG4gICAgLy8gICAgICAgc3BlY3RydW1XaWR0aCAvIDIsXG4gICAgLy8gICAgICAgYm9yZGVySGVpZ2h0XG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgIC8vICAgICAgIGksXG4gICAgLy8gICAgICAgaSAqIHNwZWN0cnVtV2lkdGggKyA0LFxuICAgIC8vICAgICAgIHNwZWN0cnVtSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICogMC41XG4gICAgLy8gICAgICk7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAvLyB0aGlzLmN0eC5maWxsKCk7XG5cbiAgICAvLyBkcmF3IHRpbWVcbiAgICAvLyB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAvLyB0aGlzLmN0eC50ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgIC8vIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgIC8vIHRoaXMuY3R4LmZvbnQgPSAnMTVweCBBcmlhbCc7XG4gICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgIC8vICAgTWF0aC5yb3VuZCh0aGlzLnNvdW5kLnRpbWUgKiAxMCkgLyAxMCArXG4gICAgLy8gICAgICcgLyAnICtcbiAgICAvLyAgICAgTWF0aC5yb3VuZCh0aGlzLnNvdW5kLmR1cmF0aW9uICogMTApIC8gMTAsXG4gICAgLy8gICB0aGlzLmNhbnZhcy53aWR0aCAtIDUsXG4gICAgLy8gICA1XG4gICAgLy8gKTtcbiAgfVxuXG4gIGJhY2tncm91bmQoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICB0aGlzLmN0eC5yZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gIH1cblxuICBzcGVjdHJ1bSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBzcGVjdHJ1bSxcbiAgICAgIHNwZWN0cnVtTGVuZ3RoLFxuICAgICAgc3BlY3RydW1Db2xvcnMsXG4gICAgICBib3JkZXJIZWlnaHQsXG4gICAgfSA9IHRoaXMuY29uZmlnXG4gICAgY29uc3Qgc3BlY3RydW1XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gc3BlY3RydW1MZW5ndGhcbiAgICBjb25zdCBzcGVjdHJ1bUhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodCAtIGJvcmRlckhlaWdodFxuICAgIGxldCBzcGVjdHJ1bVZhbHVlID0gbnVsbFxuXG4gICAgc3BlY3RydW0uZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICAgIHNwZWN0cnVtVmFsdWUgPSBzIC8gMjU2XG4gICAgICB0aGlzLmN0eC5yZWN0KFxuICAgICAgICBpICogc3BlY3RydW1XaWR0aCxcbiAgICAgICAgc3BlY3RydW1IZWlnaHQgLSBzcGVjdHJ1bUhlaWdodCAqIHNwZWN0cnVtVmFsdWUsXG4gICAgICAgIHNwZWN0cnVtV2lkdGggLyAyLFxuICAgICAgICBzcGVjdHJ1bUhlaWdodCAqIHNwZWN0cnVtVmFsdWUsXG4gICAgICApXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBzcGVjdHJ1bUNvbG9yc1tpXVxuICAgICAgdGhpcy5jdHguZmlsbCgpXG4gICAgfSlcbiAgfVxuXG4gIHdhdmVmb3JtKCkge1xuICAgIGNvbnN0IHsgd2F2ZWZvcm0sIHdhdmVmb3JtTGVuZ3RoLCBib3JkZXJIZWlnaHQgfSA9IHRoaXMuY29uZmlnXG4gICAgY29uc3Qgd2F2ZWZvcm1XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gd2F2ZWZvcm1MZW5ndGhcbiAgICBjb25zdCB3YXZlZm9ybUhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodCAtIGJvcmRlckhlaWdodFxuICAgIGxldCB3YXZlZm9ybVZhbHVlID0gbnVsbFxuXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcblxuICAgIHdhdmVmb3JtLmZvckVhY2goKHcsIGkpID0+IHtcbiAgICAgIHdhdmVmb3JtVmFsdWUgPSB3IC8gMjU2XG4gICAgICBpZiAoaSA9PSAwKVxuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oaSAqIHdhdmVmb3JtV2lkdGgsIHdhdmVmb3JtSGVpZ2h0ICogd2F2ZWZvcm1WYWx1ZSlcbiAgICAgIGVsc2UgdGhpcy5jdHgubGluZVRvKGkgKiB3YXZlZm9ybVdpZHRoLCB3YXZlZm9ybUhlaWdodCAqIHdhdmVmb3JtVmFsdWUpXG4gICAgfSlcblxuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwZmYnXG4gICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgfVxufVxuXG5jbGFzcyBBdWRpb1Byb2Nlc3Npbmcge1xuICBjb25zdHJ1Y3RvcihzdHJlYW0sIHZvbHVtZUNvbnRhaW5lciwgd2F2ZWZvcm1Db250YWluZXIpIHtcbiAgICB0aGlzLnZvbHVtZUNvbnRhaW5lciA9IHZvbHVtZUNvbnRhaW5lclxuICAgIHRoaXMud2F2ZWZvcm0gPSBuZXcgV2F2ZWZvcm0odGhpcywgd2F2ZWZvcm1Db250YWluZXIpXG5cbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxuICAgIHRoaXMuYW5hbHlzZXIgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpXG4gICAgdGhpcy5taWNJbnB1dCA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSlcbiAgICB0aGlzLnNjcmlwdFByb2Nlc3NvciA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCAxLCAxKVxuXG4gICAgdGhpcy5hbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSAwLjhcbiAgICB0aGlzLmFuYWx5c2VyLmZmdFNpemUgPSA1MTJcblxuICAgIHRoaXMubWljSW5wdXQuY29ubmVjdCh0aGlzLmFuYWx5c2VyKVxuICAgIHRoaXMuYW5hbHlzZXIuY29ubmVjdCh0aGlzLnNjcmlwdFByb2Nlc3NvcilcbiAgICB0aGlzLnNjcmlwdFByb2Nlc3Nvci5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKVxuXG4gICAgdGhpcy5zY3JpcHRQcm9jZXNzb3Iub25hdWRpb3Byb2Nlc3MgPSB0aGlzLmF1ZGlvUHJvY2Vzcy5iaW5kKHRoaXMpXG4gIH1cblxuICBhdWRpb1Byb2Nlc3MoKSB7XG4gICAgY29uc3Qgc3RyZWFtRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpXG5cbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHN0cmVhbURhdGEpXG4gICAgY29uc3QgYXZlcmFnZSA9IHRoaXMuZ2V0QXZlcmFnZVZvbHVtZShzdHJlYW1EYXRhKVxuXG4gICAgdGhpcy52b2x1bWVDb250YWluZXIuaW5uZXJIVE1MID0gYXZlcmFnZVxuICAgIHRoaXMud2F2ZWZvcm0uZHJhdygpXG4gIH1cblxuICBnZXRTcGVjdHJ1bSgpIHtcbiAgICBjb25zdCBzdHJlYW1EYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudClcbiAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHN0cmVhbURhdGEpXG5cbiAgICByZXR1cm4gc3RyZWFtRGF0YVxuICB9XG5cbiAgZ2V0V2F2ZWZvcm0oKSB7XG4gICAgY29uc3Qgc3RyZWFtRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpXG4gICAgdGhpcy5hbmFseXNlci5nZXRCeXRlVGltZURvbWFpbkRhdGEoc3RyZWFtRGF0YSlcblxuICAgIHJldHVybiBzdHJlYW1EYXRhXG4gIH1cblxuICBnZXRGcmVxdWVuY3koZnJlcSwgZW5kRnJlcSA9IG51bGwpIHtcbiAgICBsZXQgc3VtID0gMFxuICAgIGxldCBzcGVjdHJ1bSA9IHRoaXMuZ2V0U3BlY3RydW0oKVxuICAgIGlmIChlbmRGcmVxICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSBmcmVxOyBpIDw9IGVuZEZyZXE7IGkrKykge1xuICAgICAgICBzdW0gKz0gc3BlY3RydW1baV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdW0gLyAoZW5kRnJlcSAtIGZyZXEgKyAxKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3BlY3RydW1bZnJlcV1cbiAgICB9XG4gIH1cblxuICBnZXRBdmVyYWdlVm9sdW1lKGZyZXF1ZW5jaWVzKSB7XG4gICAgbGV0IHZhbHVlcyA9IDBcbiAgICBmcmVxdWVuY2llcy5mb3JFYWNoKHYgPT4gKHZhbHVlcyArPSB2KSlcblxuICAgIGNvbnN0IGF2ZXJhZ2UgPSB2YWx1ZXMgLyBmcmVxdWVuY2llcy5sZW5ndGhcblxuICAgIHJldHVybiBhdmVyYWdlXG4gIH1cblxuICBnZXROb3RlTmJGcm9tUGl0Y2goZnJlcXVlbmN5KSB7XG4gICAgY29uc3Qgbm90ZU51bSA9IDEyICogKE1hdGgubG9nKGZyZXF1ZW5jeSAvIDQ0MCkgLyBNYXRoLmxvZygyKSlcbiAgICByZXR1cm4gTWF0aC5yb3VuZChub3RlTnVtKSArIDY5XG4gIH1cblxuICBnZXROb3RlRnJvbVBpdGNoKG5vdGVOYikge1xuICAgIGNvbnN0IG5vdGVzID0gW1xuICAgICAgJ0MnLFxuICAgICAgJ0MjJyxcbiAgICAgICdEJyxcbiAgICAgICdEIycsXG4gICAgICAnRScsXG4gICAgICAnRicsXG4gICAgICAnRiMnLFxuICAgICAgJ0cnLFxuICAgICAgJ0cjJyxcbiAgICAgICdBJyxcbiAgICAgICdBIycsXG4gICAgICAnQicsXG4gICAgXVxuICAgIHJldHVybiBub3Rlc1tub3RlTmIgJSAxMl1cbiAgfVxuXG4gIGdldEZyZXF1ZW5jeUZyb21Ob3RlTnVtYmVyKG5vdGUpIHtcbiAgICByZXR1cm4gNDQwICogTWF0aC5wb3coMiwgKG5vdGUgLSA2OSkgLyAxMilcbiAgfVxuXG4gIGdldENlbnRzT2ZmRnJvbVBpdGNoKGZyZXF1ZW5jeSwgbm90ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKFxuICAgICAgKDEyMDAgKiBNYXRoLmxvZyhmcmVxdWVuY3kgLyB0aGlzLmZyZXF1ZW5jeUZyb21Ob3RlTnVtYmVyKG5vdGUpKSkgL1xuICAgICAgICBNYXRoLmxvZygyKSxcbiAgICApXG4gIH1cbn1cblxuY2xhc3MgQXBwIHtcbiAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgdGhpcy5yb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcHApXG4gICAgdGhpcy5lbHMgPSB7XG4gICAgICBzcGVlY2hDb250YWluZXI6IHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKGAke2FwcH1fX3NwZWVjaGApLFxuICAgICAgaGlzdG9yeUNvbnRhaW5lcjogdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoYCR7YXBwfV9faGlzdG9yeWApLFxuICAgICAgbGFuZ0NvbnRhaW5lcjogdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoYCR7YXBwfV9fbGFuZyBzZWxlY3RgKSxcbiAgICAgIHZvbHVtZUNvbnRhaW5lcjogdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoYCR7YXBwfV9fdm9sdW1lYCksXG4gICAgICB3YXZlZm9ybUNvbnRhaW5lcjogdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoYCR7YXBwfV9fd2F2ZWZvcm1gKSxcbiAgICB9XG5cbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSlcbiAgICAgIC50aGVuKHN0cmVhbSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFJlY29nbml0aW9uKClcblxuICAgICAgICB0aGlzLmluaXRBdWRpb1Byb2Nlc3Npbmcoc3RyZWFtKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUpKVxuICB9XG5cbiAgaW5pdFJlY29nbml0aW9uKCkge1xuICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgUmVjb2duaXRpb24oXG4gICAgICB0aGlzLmVscy5sYW5nQ29udGFpbmVyLFxuICAgICAgdGhpcy5lbHMuaGlzdG9yeUNvbnRhaW5lcixcbiAgICAgIHRoaXMuZWxzLnNwZWVjaENvbnRhaW5lcixcbiAgICApXG4gIH1cblxuICBpbml0QXVkaW9Qcm9jZXNzaW5nKHN0cmVhbSkge1xuICAgIHRoaXMuYXVkaW9Qcm9jZXNzaW5nID0gbmV3IEF1ZGlvUHJvY2Vzc2luZyhcbiAgICAgIHN0cmVhbSxcbiAgICAgIHRoaXMuZWxzLnZvbHVtZUNvbnRhaW5lcixcbiAgICAgIHRoaXMuZWxzLndhdmVmb3JtQ29udGFpbmVyLFxuICAgIClcbiAgfVxufVxuXG53aW5kb3cuYXBwID0gbmV3IEFwcCgnLmFwcCcpXG4iXSwic291cmNlUm9vdCI6IiJ9