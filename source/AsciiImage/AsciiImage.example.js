import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import AsciiImage from './AsciiImage'
import styles from './AsciiImage.example.css'

const data = [
  {
    className: styles.MatrixImage,
    image: require('../demo/matrix.jpg'),
    title: 'JPG'
  },
  {
    className: styles.GoogleImage,
    image: require('../demo/google.png'),
    title: 'PNG (with transparency)'
  }
]

export default class AsciiImageExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animated: false,
      blockSize: 4,
      fontSize: 8
    }

    this._updateState = debounce(this._updateState.bind(this), 500)

    this._onAnimatedChange = this._onAnimatedChange.bind(this)
    this._onBlockSizeChange = this._onBlockSizeChange.bind(this)
    this._onFontSizeChange = this._onFontSizeChange.bind(this)
  }

  render () {
    const { animated, blockSize, fontSize } = this.state

    return (
      <div className={styles.AsciiImageExample}>
        <div className={styles.OptionsRow}>
          <label>
            Block size:
            <input
              defaultValue={blockSize}
              onChange={this._onBlockSizeChange}
              step={1}
              type='number'
            />
          </label>
          <label>
            Font size:
            <input
              defaultValue={fontSize}
              onChange={this._onFontSizeChange}
              step={1}
              type='number'
            />
          </label>
          <label>
            <input
              defaultChecked={animated}
              onChange={this._onAnimatedChange}
              type='checkbox'
            />
            Animated?
          </label>
        </div>

        {data.map((datum) => (
          <div
            className={styles.Datum}
            key={datum.title}
          >
            <h3>{datum.title}</h3>
            <div className={styles.ImageRow}>
              <img src={datum.image} />
              <AsciiImage
                animated={animated}
                animationInterval={100}
                blockSize={blockSize}
                className={datum.className}
                fontSize={fontSize}
                url={datum.image}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _updateState (state) {
    this.setState(state)
  }

  _onAnimatedChange (event) {
    this._updateState({
      animated: event.target.checked
    })
  }

  _onBlockSizeChange (event) {
    this._updateState({
      blockSize: ~~(event.target.value)
    })
  }

  _onFontSizeChange (event) {
    this._updateState({
      fontSize: ~~(event.target.value)
    })
  }
}
