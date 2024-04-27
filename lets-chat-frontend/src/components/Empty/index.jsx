import React, { Component } from 'react'
import "./index.css"

export default class Empty extends Component {
  render() {
    return (
      <div className='empty'>
        <div className='empty_box'>
            <h1>You don’t have a contact selected!</h1>
            <div>Choose one from your existing messages, or start a new one.</div>
        </div>
      </div>
    )
  }
}
