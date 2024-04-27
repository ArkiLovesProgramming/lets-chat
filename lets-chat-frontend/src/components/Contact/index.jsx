import React, { Component } from 'react'
import "./index.css"
import ContactList from './ContactList'
import GroupList from './GroupList'
import ContactInput from './ContactInput'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

class Contact extends Component {

  state = {
    activatedItem: ""
  }

  setActivatedItem = (itemId)=>{
    this.setState({activatedItem: itemId})
  }

  componentDidMount(){
    this.checkIfActivated()
  }

  checkIfActivated = () => {
    if (this.props.location.pathname.startsWith("/message/")) {
        let str = this.props.location.pathname.split("/").pop();
        this.setState({activatedItem: str})
    }
  }

  render() {
    return (
      <div className='contact'>
        <div className='contact_input'>
          <ContactInput/>
        </div>
        <ContactList activatedItem={this.state.activatedItem} setActivatedItem={this.setActivatedItem}/>
        <GroupList activatedItem={this.state.activatedItem} setActivatedItem={this.setActivatedItem}/>
      </div>
    )
  }
}

export default withRouter(Contact)