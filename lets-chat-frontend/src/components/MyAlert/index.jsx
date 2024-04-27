import React, { Component } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default class MyAlert
 extends Component {

    state = {
        closeAlert: ()=>{},
        open: true,
        _severity: "success",
        _content: "default content"
    }
    
    static getDerivedStateFromProps(props, state){
        return {...props}
    }

    closemyclert=(event, reason)=>{
        if (reason === 'clickaway') {
            return;
        }
        this.state.closeAlert()
    }

    render() {
        const { _severity, _content, open, closeAlert } = this.state
        return (
        <div>
            <Snackbar open={open} autoHideDuration={3500} onClose={this.closemyclert}>
                <Alert
                onClose={closeAlert}
                severity={`${_severity}`}
                variant="filled"
                sx={{ width: '100%' }}
                >
                    {_content}
                </Alert>
            </Snackbar>
        </div>
        )
    }
}
