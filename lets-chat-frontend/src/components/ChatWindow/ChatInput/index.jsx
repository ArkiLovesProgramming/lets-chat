import React, { Component } from 'react'
import "./index.css"
import SendIcon from '@mui/icons-material/Send';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Divider from '@mui/material/Divider';
import MyEmojiPicker from './MyEmojiPicker';

export default class ChatInput extends Component {

    state = {isOpen: false, value: ""}

    insertEmojiAtCursor = (emoji) => {
        const { input } = this
        // 获取光标位置
        const position = input.selectionStart;
    
        // 将输入框的值拆分成两部分：光标位置之前的文本和光标位置之后的文本
        const valueBeforeCursor = input.value.slice(0, position);
        const valueAfterCursor = input.value.slice(position);
    
        // 在光标位置处插入 emoji
        const newValue = valueBeforeCursor + emoji + valueAfterCursor;
    
        // 更新输入框的值，并将光标位置设置为插入 emoji 后的位置
        input.value = newValue;
        console.log(position + emoji.length)
        input.setSelectionRange(position + emoji.length, position + emoji.length);
        input.focus()

        // 更新组件状态
        this.setState({ value: newValue });

    }

    changeValue = (e)=>{
        this.setState({value: e.target.value})
    }

    openEmojiPannal = ()=>{
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.setState({isOpen: true})
        }, 1)
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    closeEmoji = ()=>{
        this.setState({isOpen: false})
    }

    send = (e)=>{
        if (this.state.value.trim() === ""){
            return;
        }
        this.props.send(this.state.value.trim())
        this.input.value = ""
        this.setState({value: ""})
    }

    keyupSend = (e)=>{
        if(e.keyCode === 13){
            this.send()
        }
    }

    render() {
        const { isOpen } = this.state
        return (
            <div className='chatInput'>
                <Divider/>
                <div className='chatInput_box'>
                    <input onKeyUp={this.keyupSend} ref={c => {this.input = c}} type="text" placeholder='Write message here' defaultValue={this.state.value} onChange={this.changeValue} />
                    <div className='emojiBox'>
                        <button onClick={this.openEmojiPannal}>
                            <EmojiEmotionsOutlinedIcon sx={{width: 24, height: 24, verticalAlign: "middle"}}/>
                        </button>
                        <MyEmojiPicker insertEmojiAtCursor={this.insertEmojiAtCursor} closeEmoji={this.closeEmoji} isOpen={isOpen}/>
                    </div>
                    <button>
                        <PermMediaIcon sx={{width: 21, height: 21, verticalAlign: "middle"}}/>
                    </button>
                    <button id='send' onClick={this.send}>
                        <SendIcon sx={{width: 24, height: 24, verticalAlign: "middle"}}/>
                    </button>
                </div>
            </div>
        )
    }
}
