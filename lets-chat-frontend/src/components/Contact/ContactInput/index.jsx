import React, {Component} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "./index.css";
import Avatar from '@mui/material/Avatar';
import cm from "../../../common/common"
import api from '../../../common/api';
import OnlineUsersListItem from './OnlineUsersListItem';
import MyAlert from '../../MyAlert'
import PubSub from 'pubsub-js';


export default class ContactInput extends Component{

  state = {
    value: "",
    resultList: [],
    contactInputBoxIsFocus: false,
    contacts: [],
    alert: {
      open: false,
      severity: "sccuess",
      content: "This is a default alert."
    }
  }

  deleteOneContact = (_, groupId)=>{
    let new_contacts = this.state.contacts.filter(item=>{
      if (item.id !== groupId) return true;
      return false
    })
    this.setState({contacts: new_contacts})
  }

  alert = (severity, content) => {
    console.log(severity, content)
    this.setState({
        alert: {
            open: true,
            severity: severity,
            content: content
        }
    })
  }

  closeAlert = ()=>{
      this.setState({
          alert: {
              open: false
          }
      })
  }

  valueChange=(e)=>{
    this.setState({value: e.target.value})
  }

  buttonSearchClick=()=>{
    if (this.state.value.trim() === ""){
      return;
    }
    api.userApi.getUsersByUsername(this.state.value.trim()).then(
      res=>{
        this.setState({resultList: res.data, value: ""})
        this.contactInput.value = ""
      }
    )
  }

  enterkeyup = (e)=>{
    if (e.keyCode === 13){
      this.buttonSearchClick()
    }
  }

  componentDidMount(){
    let userId = localStorage.getItem("userId")
    api.groupApi.getContacts(userId).then(
      res=>{
        this.setState({contacts: res.data})
      }
    )
    PubSub.subscribe("contactsDeleteOneContact", this.deleteOneContact)
  }

  contactInputBoxFocus = ()=>{
    this.setState({contactInputBoxIsFocus: true})
  }

  clickResultContact = (userId)=>{
    return (e)=>{
      api.groupApi.addContact(userId, localStorage.getItem("userId")).then(
        res=>{
          this.alert("success", "Start to chat with them!")
        }
      )
    }
  }

  render(){
    const {StyledBadge, stringAvatar} = cm
    const { contacts } = this.state
    return (
      <div onClick={this.handleClickOutsideBox} className='contact_input_outer_box'>
        <Paper
          component="div"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
          style={{boxShadow: "none", backgroundColor: "#EBEEF5"}}
        >
          <InputBase
            ref={c => {this.contactInput = c}}
            onFocus={this.contactInputBoxFocus}
            onKeyUp={this.enterkeyup}
            value={this.value}
            onChange={this.valueChange}
            className='myinput'
            style={{minWidth: "0px"}}
            sx={{ ml: 1, flex: 1, width: "100%"}}
            placeholder="Search contact"
          />
          <IconButton onClick={this.buttonSearchClick} type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Paper>
        <div className='contact_result_list'>
          <div className='onlineUsersList'>
            {
              contacts.map(item=>{
                return <OnlineUsersListItem userIds={item.userIds}/>
              })
            }
          </div>
          <ul>
            {
              this.state.contactInputBoxIsFocus ? (
                this.state.resultList.length === 0 ? (
                  <div>
                    <h4 style={{textAlign: "center"}}>Search for your contact!</h4>
                  </div>
                ) : (
                  this.state.resultList.map(item=>{
                    if (item.id === localStorage.getItem("userId")) return "";
                    return (
                      <li onClick={this.clickResultContact(item.id)}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                        >
                          <Avatar style={{width: "44px", height: "44px"}} alt="" {...stringAvatar(`${item.username}`)} />
                          {/* <Avatar style={{width: "44px", height: "44px"}} alt="Avatar" src="https://img1.baidu.com/it/u=1345128896,1573175574&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" /> */}
                        </StyledBadge>
                        <div className='result_item_info'>
                          <div >{item.username}</div>
                          <div>{item.bio}</div>
                        </div>
                      </li>
                    )
                  })
                )
              ) : (<div></div>)
            }
          </ul>
        </div>
        <MyAlert open={this.state.alert.open} closeAlert={this.closeAlert} _content={this.state.alert.content} _severity={this.state.alert.severity}/>
      </div>
    );
  } 
}