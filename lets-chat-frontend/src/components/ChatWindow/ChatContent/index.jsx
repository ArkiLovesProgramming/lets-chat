import React, { Component } from 'react'
import "./index.css"
import ChatContentItem from './ChatContentItem'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default class ChatContent extends Component {

  // 获取节点
  componentDidUpdate(){
    if(this.chatContentWindow.scrollHeight > this.chatContentWindow.clientHeight) {
      this.chatContentWindow.scrollTop = this.chatContentWindow.scrollHeight;
    }
  }
  

  render() {

    const { messages } = this.props

    // const props = {avatar_url: "data:image/jpeg;base64,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", sender: "wei", create_time: "10.20 AM Yesterday", content: "事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理。这些事件可来自 Javascript 引擎当前执行的代码块如 setTimeout、也可以是来自浏览器内核其他线程如鼠标点击、Ajax 异步请求等，但由于 JS 是单线程的，所有这些事件都需要排队等待 JS 引擎处理。", fromMe: false}
    // const props2 = {avatar_url: "https://img0.baidu.com/it/u=2455899697,228475993&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500", sender: "Arki arki", create_time: "10.25 AM Yesterday", content: "男生头像｜酷头像"
    // + "这个男生手绘头像有点酷噢~"
    // + "原作者水印", fromMe: true}

    return (
      <div ref={c => this.chatContentWindow = c} className='chatContent'>
        {messages === "loading" ? (
           <Box sx={{ width: "100%", padding: "15px 0px"}}>
            <Skeleton animation="wave" sx={{marginBottom: "20px"}} variant="rectangular" width={"100%"} height={60} />
            <Skeleton animation="wave" sx={{marginBottom: "20px"}} variant="rectangular" width={"100%"} height={60} />
            <Skeleton animation="wave" sx={{marginBottom: "20px"}} variant="rectangular" width={"100%"} height={60} />
            <Skeleton animation="wave" sx={{marginBottom: "20px"}} variant="rectangular" width={"100%"} height={60} />
          </Box>
        ) : (
          messages.map(item => (
            <ChatContentItem key={item.id} message={item} />
          ))
        )}          
      </div>
    )
  }
}
