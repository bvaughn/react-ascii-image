import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import AsciiImage from './AsciiImage'

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
      <div>
        <AsciiImage
          animated={animated}
          blockSize={blockSize}
          fontSize={fontSize}
          url={require('../demo/google.png')}
        />

        <label>
          <input
            checked={animated}
            onChange={this._onAnimatedChange}
            type='checkbox'
          />
          Animated?
        </label>
        <br/>
        <label>
          Block size:
          <input
            onChange={this._onBlockSizeChange}
            step={1}
            type='number'
            value={blockSize}
          />
        </label>
        <br/>
        <label>
          Font size:
          <input
            onChange={this._onFontSizeChange}
            step={1}
            type='number'
            value={fontSize}
          />
        </label>
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
