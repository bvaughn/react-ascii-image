import AsciiImageExample from '../AsciiImage/AsciiImage.example'
import React, { Component } from 'react'
import styles from './Application.css'
import { render } from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import '../../styles.css'

class Application extends Component {
  render () {
    return (
      <div className={styles.demo}>
        <AsciiImageExample
          url='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
        />
      </div>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}

render(
  <Application />,
  document.getElementById('root')
)

// Import and attach the favicon
document.querySelector('[rel="shortcut icon"]').href = require('file!./favicon.png')
