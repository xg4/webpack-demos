import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { sum } from './utils'
import './index.css'
import './index.less'
import './index.js'

ReactDOM.render(<App />, document.getElementById('root'))

const fn = (a: string) => a

console.log(fn('aaa'))

console.log(sum(1, 2))
