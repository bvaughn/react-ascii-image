/** @flow */
import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'

const CHARACTERS = ['@', '#', '$', '%', '^', '&', '*']

export default class AsciiImage extends Component {
  static propTypes = {
    animated: PropTypes.bool.isRequired,
    animationInterval: PropTypes.number.isRequired,
    blockSize: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
  };

  static defaultProps = {
    animated: false,
    animationInterval: 350,
    blockSize: 5,
    fontSize: 10
  };

  constructor (props, context) {
    super(props, context)

    this.state = {
      colorData: null
    }

    this._onImageLoad = this._onImageLoad.bind(this)
  }

  componentDidMount () {
    const { animated } = this.props

    this._loadImage()

    if (animated) {
      this._startAnimation()
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const {
      animated,
      animationInterval,
      blockSize,
      fontSize,
      url
    } = this.props

    if (url !== nextProps.url) {
      this.setState({
        colorData: null
      })

      this._loadImage(nextProps)
    } else if (
      blockSize !== nextProps.blockSize ||
      fontSize !== nextProps.fontSize
    ) {
      this._processImage(nextProps)
    }

    if (
      !animated &&
      nextProps.animated
    ) {
      this._startAnimation()
    } else if (
      animated &&
      !nextProps.animated
    ) {
      this._stopAnimation()
    }
  }

  render () {
    const { fontSize } = this.props
    const { colorData } = this.state

    if (!colorData) {
      return (
        <div {...this.props}>
          Loading...
        </div>
      )
    }

    const texts = colorData.map((row) => {
      return row
        .filter((column) => column.alpha)
        .map((column) => {
        const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]

        return (
          <text
            key={`${column.column},${column.row}`}
            style={{
              fill: `rgba(${column.red}, ${column.green}, ${column.blue}, ${column.alpha})`,
              fontSize
            }}
            x={column.column}
            y={column.row}
          >
            {character}
          </text>
        )
      })
    })

    return (
      <svg
        {...this.props}
        height={this._canvas.height}
        width={this._canvas.width}
      >
        {texts}
      </svg>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _loadImage (props = this.props) {
    const { url } = props

    this._image = new Image()
    this._image.addEventListener('load', this._onImageLoad, false)
    this._image.src = url
  }

  _processImage (props = this.props) {
    const { blockSize, fontSize } = props

    const height = this._canvas.height
    const width = this._canvas.width

    // 2d Array~ rows containing rows and columns
    const colorData = []

    // It's faster to fetch all pixel color data at once and iterate over the Array.
    const imageData = this._context.getImageData(0, 0, width, height).data

    for (let row = 0; row < height; row += fontSize) {
      let yStop = Math.min(height, row + fontSize)

      let columns = []

      for (let column = 0; column < width; column += fontSize) {
        let xStop = Math.min(width, column + fontSize)

        let alphaTotals = 0
        let redTotals = 0
        let greenTotals = 0
        let blueTotals = 0
        let numSamples = 0

        for (let y = row; y < yStop; y += blockSize) {
          for (let x = column; x < xStop; x += blockSize) {
            // let pixelData = this._context.getImageData(x, y, 1, 1).data
            // let [red, green, blue, alpha] = pixelData
            let index = (y * width + x) * 4
            let red = imageData[index]
            let green = imageData[index + 1]
            let blue = imageData[index + 2]
            let alpha = imageData[index + 3]

            numSamples++
            alphaTotals += alpha
            redTotals += red
            greenTotals += green
            blueTotals += blue
          }
        }

        let red = Math.round(redTotals / numSamples)
        let green = Math.round(greenTotals / numSamples)
        let blue = Math.round(blueTotals / numSamples)
        let alpha = Math.round(alphaTotals / numSamples) / 255

        columns.push({
          alpha,
          blue,
          column,
          green,
          red,
          row
        })
      }

      colorData.push(columns)
    }

    this.setState({ colorData })
  }

  _startAnimation () {
    const { animationInterval } = this.props

    this._animationIntervalId = setInterval(() => {
      this.forceUpdate()
    }, animationInterval)
  }

  _stopAnimation () {
    clearInterval(this._animationIntervalId)
  }

  _onImageLoad (event) {
    this._canvas = document.createElement('canvas')
    this._canvas.width = this._image.width
    this._canvas.height = this._image.height

    this._context = this._canvas.getContext('2d')
    this._context.drawImage(this._image, 0, 0, this._canvas.width, this._canvas.height)

    this._processImage()
  }
}
