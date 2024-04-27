import React, { Component } from 'react'
import "./index.css"
import ChatInfo from './ChatInfo'
import ChatContent from './ChatContent'
import ChatInput from './ChatInput'
import Divider from '@mui/material/Divider';
import api from '../../common/api';
import ws from '../../common/websocket'
import PubSub from 'pubsub-js'


export default class ChatWindow extends Component {

  state = {
    // groupId: "loading",
    users: [],
    messages: "loading"
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.groupId);
    ws.connect(this.props.match.params.groupId)
    PubSub.subscribe("addOneMessage", (_, msgStr)=>{this.setState({messages: [...this.state.messages, JSON.parse(msgStr)]})})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
      this.fetchData(this.props.match.params.groupId);
      ws.disconnect()
      ws.connect(this.props.match.params.groupId)
    }
  }

  fetchData(groupId) {
    api.groupApi.getGroupById(groupId).then(res => {
      const group = res.data;
      console.log(group.userIds)

      api.userApi.getUsersByIdS(group.userIds).then(res2 => {
        const users = res2.data;
        console.log(users)

        api.messageApi.allMessagesByGroupId(groupId).then(res3 => {
          const messages = res3.data;

          this.setState({
            users,
            messages
          });
        });
      });
    });
  }

  send = (msg)=>{
    ws.send(msg)
  }

  render() {

    const { users, messages } = this.state
    const { groupId } = this.props.match.params

    return (
      <div style={{padding: "20px 15px 20px 0px", boxSizing: "border-box", height: "100%"}}>
        <div className='chatwindow'>
          <ChatInfo groupId={groupId} users={users} />
          <Divider/>
          <ChatContent messages={messages}/>
          <ChatInput send={this.send}/>
        </div>
      </div>
    )
  }
}
