import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import "./index.css"
import Divider from '@mui/material/Divider';
import api from '../../../../common/api';
import formatTime from '../../../../common/time'
import Skeleton from '@mui/material/Skeleton';

export default class ChatContentItem extends Component {

    static getDerivedStateFromProps(props, state){
        return {message: props.message}
    }

    state = {
        data: {senderName: "loading", avatar_url: "loading"}
    }

    componentDidMount(){
        const { message } = this.state
        let data1 = {}
        api.userApi.getUserById(message.senderId).then(
            res=>{
                data1.senderName = res.data.username
                this.setState({data: data1})
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

        const {senderName} = this.state.data

        let isFromMe = localStorage.getItem("userId") === this.props.message.senderId
        const create_date = new Date(parseInt(this.props.message.createTime))
        let create_time = formatTime(create_date)
        let content = this.props.message.content

        return (
            <div className={`chatContentItem ${isFromMe ? "chatContentItem_fromMe" : ""}`}>
                {senderName !== "loading" ? (
                        <Avatar className='chatContentItem_avatar' sx={{ width: "40px", height: "40px" }} alt="" {...this.stringAvatar(`${senderName}`)} />
                        // {/* <Avatar className='chatContentItem_avatar' alt="Remy Sharp" src={avatar_url} /> */}
                    ) : (
                        <Skeleton className='chatContentItem_avatar' sx={{marginRight: "15px"}} variant="circular" width={40} height={40} />
                )}
                {/* <Avatar className='chatContentItem_avatar' style={{ width: "40px", height: "40px" }} alt="" {...this.stringAvatar(`${senderName}`)} /> */}
                <div className='chatContentItem_right'>
                    <div className='sender_info'>
                        <span>{senderName}</span>
                        <Divider sx={{margin: "0px 8px"}} orientation="vertical" variant="" flexItem />
                        <span className='sender_info_time'>{create_time}</span>
                    </div>
                    <div className='chatContentItem_bubble'>
                        <div>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
