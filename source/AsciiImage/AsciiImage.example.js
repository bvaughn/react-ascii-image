import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import AsciiImage from './AsciiImage'
import styles from './AsciiImage.example.css'

export default class AsciiImageExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animated: false,
      blockSize: 5,
      fontSize: 10
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
        <h3>Original Image</h3>
        <img
          className={styles.Image}
          src={require('../demo/google.png')}
        />

        <h3>AsciiImage</h3>
        <AsciiImage
          animated={animated}
          blockSize={blockSize}
          className={styles.AsciiImage}
          fontSize={fontSize}
          url={require('../demo/google.png')}
        />

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
