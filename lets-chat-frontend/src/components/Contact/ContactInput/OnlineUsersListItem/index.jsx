import React, { Component } from 'react'
import "../index.css"
import Avatar from '@mui/material/Avatar';
import cm from '../../../../common/common'
import api from '../../../../common/api';

export default class OnlineUsersListItem extends Component {

    state = {
        username: ""
    }

    componentDidMount(){
        const { userIds } = this.props
        if (userIds === undefined) return;
        let userId = userIds.filter(item=>{
            if (item === localStorage.getItem("userId")){
                return false
            }
            return true
        })
        api.userApi.getUserById(userId[0]).then(
            res=>{
                this.setState({username: res.data.username})
            },
            err=>{
                console.log(err.message)
            }
        )
    }

    render() {
        const {StyledBadge, stringAvatar} = cm
        const { username } = this.state
        return (
            <div className='onlineUsersList_item'>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    >
                    <Avatar style={{width: "44px", height: "44px"}} alt="" {...stringAvatar(`${username}`)} />
                    {/* <Avatar style={{width: "44px", height: "44px"}} alt="Avatar" src="https://img1.baidu.com/it/u=1345128896,1573175574&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" /> */}
                </StyledBadge>
            </div>
        )
    }
}
