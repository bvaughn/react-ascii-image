import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import AsciiImage, { DEFAULT_CHARACATERS } from './AsciiImage'
import styles from './AsciiImage.example.css'

const CROSS_ORIGIN_BLOCKER = 'http://crossorigin.me/'

export default class AsciiImageExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animated: false,
      blockSize: 4,
      characterDensity: 1,
      characters: DEFAULT_CHARACATERS,
      fontSize: 8,
      renderMode: 'inline-block',
      url: 'https://images.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    }

    this._updateState = debounce(this._updateState.bind(this), 500)

    this._onAnimatedChange = this._onAnimatedChange.bind(this)
    this._onBlockSizeChange = this._onBlockSizeChange.bind(this)
    this._onCharacterDensityChange = this._onCharacterDensityChange.bind(this)
    this._onCharactersChange = this._onCharactersChange.bind(this)
    this._onFontSizeChange = this._onFontSizeChange.bind(this)
    this._onRenderModeChange = this._onRenderModeChange.bind(this)
    this._onUrlChange = this._onUrlChange.bind(this)
  }

  render () {
    const { animated, blockSize, characterDensity, characters, fontSize, renderMode, url } = this.state

    return (
      <div className={styles.AsciiImageExample}>
        <h1 className={styles.header}>
          react-ascii-image

          <small className={styles.headerSmall}>
            <a href='https://github.com/bvaughn/react-ascii-image'>
              Documentation and code on Github
            </a>
          </small>
        </h1>

        <div className={styles.OptionsRow}>
          <label>
            blockSize:{' '}
            <input
              className={styles.SmallInput}
              defaultValue={blockSize}
              min={4}
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
              min={4}
              onChange={this._onFontSizeChange}
              step={1}
              type='number'
            />
          </label>
          <label>
            characterDensity:{' '}
            <input
              className={styles.SmallInput}
              defaultValue={characterDensity}
              max={4}
              min={1}
              onChange={this._onCharacterDensityChange}
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

        <div className={styles.Example}>
          <label>
            URL: {' '}
            <input
              className={styles.UrlInput}
              defaultValue={url}
              onChange={this._onUrlChange}
            />
          </label>
          {url && (
            <div className={styles.ImageRow}>
              <AsciiImage
                animated={animated}
                animationInterval={100}
                blockSize={blockSize}
                characterDensity={characterDensity}
                characters={characters}
                className={styles.AsciiImage}
                fontSize={fontSize}
                renderMode={renderMode}
                url={`${CROSS_ORIGIN_BLOCKER}${url}`}
              />
              <img src={url} />
            </div>
          )}
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
    const blockSize = Math.max(4, ~~(event.target.value))

    this._updateState({
      blockSize
    })
  }

  _onCharacterDensityChange (event) {
    const characterDensity = Math.max(1, Math.min(4, ~~(event.target.value)))

    this._updateState({
      characterDensity
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
    const fontSize = Math.max(4, ~~(event.target.value))

    this._updateState({
      fontSize
    })
  }

  _onRenderModeChange (event) {
    this._updateState({
      renderMode: event.target.value
    })
  }

  _onUrlChange (event) {
    this._updateState({
      url: event.target.value
    })
  }
}
