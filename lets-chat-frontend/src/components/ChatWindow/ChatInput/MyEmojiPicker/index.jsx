import React, { Component } from 'react'
//emoji
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default class MyEmojiPicker extends Component {

    onClickOutside = () => {
        this.props.closeEmoji()
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    onEmojiSelect = (data, e)=>{
        this.props.insertEmojiAtCursor(data.native)
    }

    render() {
        const { isOpen } = this.props
        return (
            isOpen ? (
                <div ref={c => this.emojiPannal = c} className='emojiPannal'>
                    <Picker onClickOutside={this.onClickOutside} searchPosition={"sticky"} previewPosition={"top"} navPosition={"top"} data={data} onEmojiSelect={this.onEmojiSelect} />
                </div>
            ) : null
        )
    }
}
