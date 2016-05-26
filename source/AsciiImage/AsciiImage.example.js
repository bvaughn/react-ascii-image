import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import AsciiImage, { DEFAULT_CHARACATERS } from './AsciiImage'
import styles from './AsciiImage.example.css'

const data = [
  {
    className: styles.MatrixImage,
    image: 'http://crossorigin.me/https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    title: 'JPG'
  },
  {
    className: styles.GoogleImage,
    image: 'http://crossorigin.me/http://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png',
    title: 'PNG (with transparency)'
  }
]

export default class AsciiImageExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animated: false,
      blockSize: 4,
      characters: DEFAULT_CHARACATERS,
      fontSize: 8,
      renderMode: 'inline-block'
    }

    this._updateState = debounce(this._updateState.bind(this), 500)

    this._onAnimatedChange = this._onAnimatedChange.bind(this)
    this._onBlockSizeChange = this._onBlockSizeChange.bind(this)
    this._onCharactersChange = this._onCharactersChange.bind(this)
    this._onFontSizeChange = this._onFontSizeChange.bind(this)
    this._onRenderModeChange = this._onRenderModeChange.bind(this)
  }

  render () {
    const { animated, blockSize, characters, fontSize, renderMode } = this.state

    return (
      <div className={styles.AsciiImageExample}>
        <div className={styles.OptionsRow}>
          <label>
            blockSize:{' '}
            <input
              className={styles.SmallInput}
              defaultValue={blockSize}
              onChange={this._onBlockSizeChange}
              step={1}
              type='number'
            />
          </label>
          <label>
            fontSize:{' '}
            <input
              className={styles.SmallInput}
              defaultValue={fontSize}
              onChange={this._onFontSizeChange}
              step={1}
              type='number'
            />
          </label>
          <label>
            characters:{' '}
            <input
              className={styles.MediumInput}
              defaultValue={characters.join('')}
              onChange={this._onCharactersChange}
            />
          </label>
          <label>
            renderMode:{' '}
            <select
              defaultValue={renderMode}
              onChange={this._onRenderModeChange}
            >
              <option value={'inline-block'}>inline-block</option>
              <option value={'svg'}>svg</option>
            </select>
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
              <img
                className={datum.className}
                src={datum.image}
              />
              <AsciiImage
                animated={animated}
                animationInterval={100}
                blockSize={blockSize}
                characters={characters}
                className={datum.className}
                fontSize={fontSize}
                renderMode={renderMode}
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

  _onCharactersChange (event) {
    const characters = [...event.target.value]
      .filter((character) => character)

    this._updateState({
      characters
    })
  }

  _onFontSizeChange (event) {
    this._updateState({
      fontSize: ~~(event.target.value)
    })
  }

  _onRenderModeChange (event) {
    this._updateState({
      renderMode: event.target.value
    })
  }
}
