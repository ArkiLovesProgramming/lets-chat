import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import "./index.css";
import api from '../../../../common/api';
import Skeleton from '@mui/material/Skeleton';

export default class ContactItem extends Component {

    state = {
        username: "loading",   //对方的
        lastMessage: "loading"
    }

    componentDidMount(){
        const {contactGroupItem} = this.props
        const myuserid = localStorage.getItem("userId")
        let userId = []
        if (contactGroupItem !== undefined && contactGroupItem.userIds !== undefined){
            userId = contactGroupItem.userIds.filter(item=>{
                if (item !== myuserid){
                    return true
                }
                return false
            })
        } else {
            return;
        }
        api.userApi.getUserById(userId[0]).then(
            res=>{
                if (res.data !== undefined){
                    api.messageApi.getLastMessageByGroupId(contactGroupItem.id).then(
                        res2=>{
                            this.setState({
                                username: res.data.username,
                                lastMessage: res2.data.content
                            })
                        }
                    )
                }
            }
        )
    }

    stringToColor = (string) => {
        let hash = 0;
        let i;
        
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
    
        return color;
    }
      
    stringAvatar = (name) => {
        let thisname
        if (name.split(' ').length === 1){
            thisname = name[0] 
        } else {
            thisname = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        }
        return {
            sx: {
                bgcolor: this.stringToColor(name),
            },
            children: thisname,
        };
    }

    render() {
        let { className } = this.props
        let data = this.state
        return (
        <div className={`contact_item ${className}`}>
            <Badge style={{left: "98%", top: "4px"}} badgeContent={4} sx={{"& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "#409EFF"
            }}}>
            </Badge>
            {data.username !== "loading" ? (
                <div className='contact_item_avatar'>
                    <Avatar style={{ width: "48px", height: "48px" }} alt="" {...this.stringAvatar(`${data.username}`)} />
                    {/* <Avatar sx={{ width: 48, height: 48 }} alt="Remy Sharp" src="https://q4.itc.cn/q_70/images03/20240405/0fe4005840664f30b76f1a63909a5489.jpeg" /> */}
                </div>
            ) : (
                <div className='contact_item_avatar'>
                    <Skeleton animation="wave" variant="circular" width={48} height={48} />
                </div>
            )}
            {data.username !== "loading" ? (
                <div className='contact_item_info'>
                    <div>{data.username}</div>
                    <div>{data.lastMessage}</div>
                </div>
            ) : (
                <div className='contact_item_info' style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} width="40%" />
                </div>
            )}
        </div>
        )
    }
}
