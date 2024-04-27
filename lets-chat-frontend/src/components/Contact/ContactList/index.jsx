import React, { Component } from 'react'
import "./index.css"
import ContactItem from './ContactItem'
import api from "../../../common/api"
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import PubSub from 'pubsub-js';
import ws from '../../../common/websocket';

class ContactList extends Component {

  state = {
    contacts: [],
    activatedItem: ""
  }

  deleteOneContact = (_, groupId)=>{
    api.groupApi.quiteGroup(groupId, localStorage.getItem("userId")).then(
      res=>{
        let new_contacts = this.state.contacts.filter(item=>{
          if (item.id !== groupId) return true;
          return false
        })
        this.setState({contacts: new_contacts})
        this.props.history.push("/message")
        ws.disconnect()
      }
    )
  }

  componentDidMount(){
    const userId = localStorage.getItem("userId")
    api.groupApi.getContacts(userId).then(
      res=>{
        this.setState({contacts: res.data})
      }
    )
    PubSub.subscribe("contactsDeleteOneContact", this.deleteOneContact)
  }

  activate = (id) => {
    const {replace} = this.props.history
    return (e)=>{
      this.props.setActivatedItem(id)
      replace(`/message/${id}`)
    }
  }

  render() {
    const { contacts } = this.state
    const { activatedItem } = this.props
    return (
      <div className='contact_list'>
        {
          contacts.map(item => (
            <div onClick={this.activate(item.id)} key={item.id}>
                <ContactItem
                contactGroupItem={item}
                className={activatedItem === item.id ? "contact_item_active" : ""}
                />
            </div>
          ))
        }
      </div>
    )
  }
}

export default withRouter(ContactList)