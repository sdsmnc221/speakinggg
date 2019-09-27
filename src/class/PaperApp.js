import paper, { Point, PointText, Path, Tool, project } from 'paper'

export default class PaperApp {
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
