import React, { Component } from 'react'
import { Avatar } from '@mui/material'
import AvatarGroup from '@mui/material/AvatarGroup';
import api from '../../../../common/api';
import cm from '../../../../common/common'

export default class GroupListItem extends Component {

  state = {
    usersingroup: []
  }

  componentDidMount(){
    api.userApi.getUsersByIdS(this.props.groupItem.userIds).then(
      res=>{
        console.log(res)
        this.setState({usersingroup: res.data})
      }, 
      err=>{
        console.log(err.message)
      }
    )
  }
  
  render() {
    const { myclassName } = this.props
    const { usersingroup } = this.state
    const { stringAvatar } = cm
    return (
        <div onClick={this.props.onClick} className={`groupList_item ${myclassName}`}>
            <Avatar sx={{ bgcolor: "#E6A23C", borderRadius: "11px", width: 34, height: 34, fontSize: "20px", fontWeight: "bold"}}>N</Avatar>
            <span className={`groupList_item_name`}>Shooting game party</span>
            <AvatarGroup total={usersingroup.length} spacing={6}>
                {
                  usersingroup.map((item, index)=>{
                      if (index >= 3) return undefined;
                      return <Avatar alt="Remy Sharp" {...stringAvatar(`${item.username}`)} />
                  })
                }
            </AvatarGroup>
        </div>
    )
  }
}
