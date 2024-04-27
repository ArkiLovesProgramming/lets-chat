import React, { Component } from 'react'
import "./index.css"
import ForumIcon from '@mui/icons-material/Forum';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import {withRouter} from 'react-router-dom'
import api from '../../common/api';
import Skeleton from '@mui/material/Skeleton';
import cm from '../../common/common'
import PubSub from 'pubsub-js';

class Navigator extends Component {

  toMessage = () => {
    this.props.history.push("/message")
  }

  toHome = () => {
    this.props.history.push("/home")
  }

  state = {
    user: "loading"
  }

  componentDidMount(){
    const userId = localStorage.getItem("userId")
    api.userApi.getUserById(userId).then(
      res=>{
        this.setState({user: res.data})
      },
      err=>{
        console.log(err)
      }
    )

    PubSub.subscribe("navi_resetUser", this.reSetUser)
  }

  reSetUser = (_, user)=>{
    this.setState({user})
  }

  render() {
    const {user} = this.state
    const {stringAvatar, StyledBadge} = cm
    return (
      <div className='navigator'>
        <div className='naviBox'>
          <ul>
              <li>
                  <button onClick={this.toMessage}>
                      <ForumIcon style={{verticalAlign: "middle", color: "white"}} fontSize="medium"/>
                  </button>
              </li>
              <li>
                  <button>
                      <MoreHorizIcon style={{verticalAlign: "middle", color: "white"}} fontSize="medium"/>
                  </button>
              </li>
              <li>
                  <button onClick={this.toHome} className='userAvatar'>
                    {user !== "loading" ? (
                      <div className='contact_item_avatar'>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                        >
                          <Avatar style={{width: "44px", height: "44px"}} alt="" {...stringAvatar(`${user.username}`)} />
                          {/* <Avatar style={{width: "44px", height: "44px"}} alt="Avatar" src="https://img1.baidu.com/it/u=1345128896,1573175574&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" /> */}
                        </StyledBadge>
                      </div>
                    ) : (
                      <div className='contact_item_avatar'>
                          <Skeleton animation="wave" variant="circular" width={44} height={44} />
                      </div>
                    )}
                  </button>
              </li>
          </ul>
        </div>
        <li>
          <button onClick={this.toHome} className='userAvatar userAvatar_mobile'>
            {user !== "loading" ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar style={{width: "44px", height: "44px"}} alt="" {...stringAvatar(`${user.username}`)} />
                {/* <Avatar style={{width: "44px", height: "44px"}} alt="Avatar" src="https://img1.baidu.com/it/u=1345128896,1573175574&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" /> */}
              </StyledBadge>
            ) : (
              <Skeleton sx={{verticalAlign: "middle", display: "inline-block"}} animation="wave" variant="circular" width={44} height={44} />
            )}
          </button>
        </li>
      </div>
    )
  }
}


export default withRouter(Navigator)


