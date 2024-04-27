import React, { Component } from 'react'
import "./index.css"
import FormControl from '@mui/material/FormControl';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import api from '../../../common/api';
import MyAlert from '../../../components/MyAlert';
import PubSub from 'pubsub-js';

export default class LoginBox extends Component {

    state = {
        usernameValue: "",
        passwordValue: "",
        showPassword: false,
        alert: {
            open: false,
            severity: "sccuess",
            content: "This is a default alert."
        }
    }
    
    closeAlert = ()=>{
        this.setState({
            alert: {
                open: false
            }
        })
    }

    toSignup = ()=>{
        this.props.history.push("/home/signup")
    }
    
    handleClickShowPassword = () => {
    this.setState((prevState) => ({
        showPassword: !prevState.showPassword
    }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    login = ()=>{
        const { usernameValue, passwordValue } = this.state
        api.userApi.login(usernameValue, passwordValue)
        .then(
            res=>{
                if (res.data.status === 1){
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    this.alert("success", "Logined in successfully!")
                    api.userApi.getUserById(res.data.userId).then(
                        res2=>{
                            PubSub.publish("navi_resetUser", res2.data)
                        }
                    )  
                } else {
                    this.alert("error", "Failed to authenticate!")
                }
                this.setState({usernameValue: "", passwordValue: ""})
            }
        )
    }

    changeState = (value) => {
        return (e)=>{
            this.setState({[value]: e.target.value})
        }
    }

    alert = (severity, content) => {
        console.log(severity, content)
        this.setState({
            alert: {
                open: true,
                severity: severity,
                content: content
            }
        })
    }

    render() {
        const { showPassword, usernameValue, passwordValue } = this.state
        return (
            <div className='loginBox'>
                <div className='loginBox_window'>
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    <FormControl variant="standard">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PersonOutlineOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField value={usernameValue} onChange={this.changeState("usernameValue")} id="input-with-sx" label="Username" variant="standard" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    value={passwordValue} onChange={this.changeState("passwordValue")}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Button onClick={this.login} sx={{marginTop: "20px"}} variant="contained">Login</Button>
                        <div style={{height: "1px", margin: "auto"}}></div>
                        <span className='singupButton_text'>or sign up using</span>
                        <div onClick={this.toSignup} className='singupButton'>SIGN UP</div>
                    </FormControl>
                </div>
                <MyAlert open={this.state.alert.open} closeAlert={this.closeAlert} _content={this.state.alert.content} _severity={this.state.alert.severity}/>
            </div>
        )
    }
}
