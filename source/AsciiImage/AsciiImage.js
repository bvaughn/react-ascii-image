/** @flow */
import React, { Component, PropTypes } from 'react'

const CHARACTERS = ['@', '#', '$', '%', '^', '&', '*']

export default class AsciiImage extends Component {
  static propTypes = {
    animated: PropTypes.bool.isRequired,
    animationInterval: PropTypes.number.isRequired,
    blockSize: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    height: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number
  };

  static defaultProps = {
    animated: false,
    animationInterval: 350,
    blockSize: 3,
    fontSize: 6
  };

  constructor (props, context) {
    super(props, context)

    this.state = {
      colorData: null
    }

    this._onImageLoad = this._onImageLoad.bind(this)
  }

  componentDidMount () {
    const { animated, animationInterval } = this.props

    this._loadImage()

    if (animated) {
      this._animationIntervalId = setInterval(() => {
        this.setState({})
      }, animationInterval)
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const { animated, animationInterval, blockSize, url } = this.props

    if (url !== nextProps.url) {
      this.setState({
        colorData: null
      })

      this._loadImage(nextProps)
    } else if (blockSize !== nextProps.blockSize) {
      this._processImage(nextProps)
    }

    if (
      !animated &&
      nextProps.animated
    ) {
      this._animationIntervalId = setInterval(() => {
        this.setState({})
      }, animationInterval)
    } else if (
      animated &&
      !nextProps.animated
    ) {
      clearInterval(this._animationIntervalId)
    }
  }

  render () {
    const { fontSize, height, width } = this.props
    const { colorData } = this.state

    if (!colorData) {
      return (
        <div
          style={{
            height,
            width
          }}
        >
          Loading...
        </div>
      )
    }

    // @TODO Try using <svg> here instead of nested <div>s?
    const rows = colorData.map((row, rowIndex) => {
      const columns = row.map((column, columnIndex) => {
        const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]

        return (
          <div
            key={`${columnIndex},${rowIndex}`}
            style={{
              color: `rgba(${column.red}, ${column.green}, ${column.blue}, ${column.alpha})`,
              display: 'inline-block',
              fontSize: fontSize,
              height: fontSize,
              lineHeight: `${fontSize}px`,
              textAlign: 'center',
              width: fontSize
            }}
          >
            {character}
          </div>
        )
      })

      return (
        <div
          key={`${rowIndex}`}
          style={{
            height: fontSize
          }}
        >
          {columns}
        </div>
      )
    })

    return (
      <div>
        {rows}
      </div>
    )
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

    // 2d Array~ rows containing columns
    const colorData = []

    for (let row = 0; row < height; row += fontSize) {
      let columns = []

      for (let column = 0; column < width; column += fontSize) {
        let alphaTotals = 0
        let redTotals = 0
        let greenTotals = 0
        let blueTotals = 0
        let numSamples = 0

        for (let y = row; y < height && y < row + fontSize; y += blockSize) {
          for (let x = column; x < width && x < column + fontSize; x += blockSize) {
            let pixelData = this._context.getImageData(x, y, 1, 1).data
            let [red, green, blue, alpha] = pixelData

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
          green,
          red
        })
      }

      colorData.push(columns)
    }

    this.setState({ colorData })
  }

  _onImageLoad (event) {
    const {
      height = this._image.height,
      width = this._image.width
    } = this.props

    // @TODO Separate chunking and image loading

    this._canvas = document.createElement('canvas')
    this._canvas.width = width
    this._canvas.height = height

    this._context = this._canvas.getContext('2d')
    this._context.drawImage(this._image, 0, 0, this._canvas.width, this._canvas.height)

    this._processImage()
  }
}
