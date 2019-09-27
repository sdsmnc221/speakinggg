paper.install(window)

var tool1, tool2
var word = 'hahahahahahahhahahahahahah'

function init() {
  paper.setup('canvas')

  var path = new Path()
  var points = word.length
  var length = word.length
  var vw = $(window).width() / 100

  var createPointText = function(str, style) {
    var text = new PointText()
    text.content = str
    text.fillColor = '#0000ff'
    if (style) {
      if (style.font) text.font = style.font
      if (style.fontFamily) text.fontFamily = style.fontFamily
      if (style.fontSize) text.fontSize = style.fontSize
      if (style.fontWeight) text.fontWeight = style.fontWeight
    }
    return text
  }

  var start = new paper.Point(Math.random() * 100, Math.random() * 100)
  for (var i = 0; i < points; i++) {
    path.add(new paper.Point(i * length + start.x, 0 + start.y))
    path.smooth()
  }

  var createAlignedText = function(str, path, style) {
    if (str && str.length > 0 && path) {
      // create PointText object for each glyph
      var glyphTexts = []
      for (var i = 0; i < str.length; i++) {
        glyphTexts[i] = createPointText(str.substring(i, i + 1), style)
        glyphTexts[i].justification = 'center'
      }
      // for each glyph find center xOffset
      var xOffsets = [0]
      for (var i = 1; i < str.length; i++) {
        var pairText = createPointText(str.substring(i - 1, i + 1), style)
        pairText.remove()
        xOffsets[i] =
          xOffsets[i - 1] +
          pairText.bounds.width -
          glyphTexts[i - 1].bounds.width / 2 -
          glyphTexts[i].bounds.width / 2
      }
      // set point for each glyph and rotate glyph aorund the point
      for (var i = 0; i < str.length; i++) {
        var centerOffs = xOffsets[i]
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
          var pathPoint = path.getPointAt(centerOffs)
          glyphTexts[i].point = pathPoint
          var tan = path.getTangentAt(centerOffs)
          glyphTexts[i].rotate(tan.angle, pathPoint)
        }
      }
    }
  }

  tool1 = new Tool()
  tool1.onMouseMove = function(event) {
    project.clear()
    var x, y
    path.firstSegment.point = event.point
    for (var i = 0; i < points - 1; i++) {
      var segment = path.segments[i]
      var nextSegment = segment.next
      var vector = new paper.Point(
        segment.point.x - nextSegment.point.x,
        segment.point.y - nextSegment.point.y,
      )
      vector.length = length
      nextSegment.point = new paper.Point(
        segment.point.x - vector.x,
        segment.point.y - vector.y,
      )
    }

    path.smooth()
    path.strokeColor = 'blue'
    path.smooth({ type: 'continuous' })

    if ($(window).width() <= 900) {
      createAlignedText(word, path, {
        fontSize: vw * 7,
        fontFamily: 'Arial',
      })
    } else {
      createAlignedText(word, path, {
        fontSize: vw * 2,
        fontFamily: 'Arial',
      })
    }

    path.fullySelected = true
  }

  tool2 = new Tool()
  tool2.onMouseMove = function(event) {
    var path = new Path.Circle(new Point(event.point, event.point), 20)
    view.onFrame = function(event) {
      project.clear()
      createAlignedText('LOADING', path, {
        fontSize: vw * 2,
        fontFamily: 'Arial',
      })
      path.rotate(5)
    }
  }
}

init()
tool1.activate()
