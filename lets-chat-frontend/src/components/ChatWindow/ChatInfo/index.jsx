import React, { Component } from 'react'
import "./index.css"
import { Avatar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Divider from '@mui/material/Divider';
import AvatarGroup from '@mui/material/AvatarGroup';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Skeleton from '@mui/material/Skeleton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PubSub from "pubsub-js"
import api from '../../../common/api';


export default class ChatInfo extends Component {

    componentDidMount(){
        // 学到了，componentDidMount是不能马上取到 props 的, 因为只会调用一次，页面挂载的时候，这里执行的其实是更新操作
        api.groupApi.getGroupById(this.props.groupId).then(
            res=>{
                this.setState({contact: res.data})
            }
        )
    }

    componentDidUpdate(prevProps){
        if (this.props.groupId !== prevProps.groupId){
            api.groupApi.getGroupById(this.props.groupId).then(
                res=>{
                    this.setState({contact: res.data})
                }
            )
        }
    }

    state = {open: false, contact: "loading"}

    handleClick = (event) => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    QuitContact = ()=>{
        PubSub.publish("contactsDeleteOneContact", this.props.groupId)
        this.handleClose()
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

        const { users } = this.props;
        const { contact } = this.state
        const loginedId = localStorage.getItem("userId");
        let receiver = "loading"
        users.forEach(item => {
            if (item.id !== loginedId) {
                receiver = item;
            }
        });

        return (
            <div className='chatinfo'>
                {receiver !== "loading" && contact !== "loading" ? (
                    <Avatar style={{ width: "46px", height: "46px", marginRight: "10px" }} alt="" {...this.stringAvatar(`${contact.type === 0 ? receiver.username : contact.name}`)} />
                    // {/* <Avatar sx={{width: 46, height: 46, marginRight: "10px"}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                ) : (
                    <Skeleton sx={{ marginRight: "10px" }} animation="wave" variant="circular" width={46} height={46} />
                )}
                <Divider orientation="vertical" variant="middle" flexItem />
                {receiver !== "loading" && contact !== "loading" ? (
                    contact.type === 0 ? (
                        <div className='chatinfo_text'>
                            <div>{contact.type === 0 ? receiver.username : contact.name}</div>
                            <div>{receiver.bio !== "" ? receiver.bio : "This person doesn't have a bio"}</div>
                        </div>
                    ) : (
                        <div className='chatinfo_text'>
                        <   div style={{lineHeight: "46px", color: "black"}}>{contact.type === 0 ? receiver.username : contact.name}</div>
                        </div>
                    )
                ) : (
                    <div className='chatinfo_text' style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="40px"
                            style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation="wave" height={10} width="40%" />
                    </div>
                )}
                <div style={{flexGrow: 1}}></div>
                <AvatarGroup total={users.length} spacing={-1}  sx={{marginRight: "10px"}}>
                    {
                        users.map((item, index)=>{
                            if (index >= 4){
                                return undefined;
                            }
                            return (
                                <Avatar key={item.id} alt="Remy Sharp" {...this.stringAvatar(`${item.username}`)} />
                                // <Avatar alt="Remy Sharp" src="https://img1.baidu.com/it/u=1333417867,4012964063&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1713632400&t=12c1fc1498a848a8f252a07f78d7d6fc" />
                            )
                        })
                    }
                </AvatarGroup>
                <Divider orientation="vertical" variant="middle" flexItem />
                {
                    contact !== "loading" && contact.type === 1 ? (
                        <button style={{marginLeft: "10px"}}>
                            <GroupAddIcon sx={{verticalAlign: "bottom", fontSize: "20px"}}/>
                        </button>
                    ) : (
                        <span></span>
                    )
                }
                <button ref={c => {this.moreButton = c}}
                    id="basic-button"
                    aria-controls={this.state.open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={this.state.open ? 'true' : undefined}
                    onClick={this.handleClick}
                >
                    <MoreHorizIcon sx={{verticalAlign: "bottom"}}/>
                </button>
                <Menu
                    sx={{marginTop: "10px"}}
                    id="basic-menu"
                    anchorEl={this.moreButton}
                    open={this.state.open}
                    onClose={this.handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={this.QuitContact}>
                        <span style={{display: "inline-block", width: "88px"}}>Quit</span><PersonRemoveIcon sx={{marginLeft: "auto"}}/>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}
