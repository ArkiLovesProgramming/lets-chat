import React, { Component } from 'react'
import GroupListItem from './GroupListItem';
import "./index.css"
import api from '../../../common/api';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class GroupList extends Component {

  state = {groups: []}

  componentDidMount = ()=>{
    let userId = localStorage.getItem("userId")
    api.groupApi.getContactGroups(userId).then(
      res=>{
        this.setState({groups: res.data})
      }
    )
  }

  mysetActivatedItem = (groupId)=>{
    const { setActivatedItem} = this.props
    return (e)=>{
      setActivatedItem(groupId)
      this.props.history.replace(`/message/${groupId}`)
    }
  }

  render() {
    const { groups } = this.state
    const { activatedItem} = this.props
    return (
      <div className='groupList'>
        <h4># Group({groups.length})</h4>
        {
          groups.map(item=>{
            if (activatedItem === item.id){
              return <GroupListItem onClick={this.mysetActivatedItem(item.id)} groupItem={item} myclassName="contact_item_active"/>
            } else {
              return <GroupListItem onClick={this.mysetActivatedItem(item.id)} groupItem={item}/>
            }
          })
        }
      </div>
    )
  }
}


export default withRouter(GroupList)