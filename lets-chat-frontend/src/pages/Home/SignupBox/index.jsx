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
import MyAlert from '../../../components/MyAlert';
import api from '../../../common/api';
import Divider from '@mui/material/Divider';

export default class SignupBox extends Component {

    state = {
        showPassword: false,
        usernameValue: "",
        passwordValue: "",
        repasswordValue: "",
        alert: {
            open: false,
            severity: "sccuess",
            content: "This is a default alert."
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

    closeAlert = ()=>{
        this.setState({
            alert: {
                open: false
            }
        })
    }

    changeForm = (valueName)=>{
        return (e)=>{
            this.setState({[valueName]: e.target.value})
        }
    }
    
    handleClickShowPassword = () => {
    this.setState((prevState) => ({
        showPassword: !prevState.showPassword
    }));
    };

    handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    signup = ()=>{
        const {usernameValue, passwordValue, repasswordValue} = this.state
        if (usernameValue.trim() === "" || passwordValue.trim() === "" || repasswordValue.trim() === ""){
            this.alert("error", "Input box are empty!")
        } else if (passwordValue !== repasswordValue) {
            this.alert("error", "Verifying password is different!")
        } else {
            api.userApi.adduser(usernameValue, passwordValue).then(
                res=>{
                    if (res.data.status === 1){
                        this.alert("success", "Signed up successfully!")
                    } else {
                        this.alert("error", res.data.msg)
                    }
                    this.setState({usernameValue: "", passwordValue: "", repasswordValue: ""})
                }
            )
        }
    }

    toLogin = ()=>{
        const { history } = this.props
        history.push("/home/login")
    }

    render() {
        const { showPassword, usernameValue, passwordValue, repasswordValue } = this.state
        return (
            <div className='loginBox'>
                <div className='loginBox_box'>
                    <div className='loginBox_left'>
                        <div className='loginBox_window'>
                            <h1 style={{textAlign: "center"}}>Sign up</h1>
                            <FormControl variant="standard">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <PersonOutlineOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        value={usernameValue}
                                        onChange={this.changeForm("usernameValue")}
                                        id="input-with-sx" label="Username" variant="standard" />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            value={passwordValue}
                                            onChange={this.changeForm("passwordValue")}
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
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Verify</InputLabel>
                                        <Input
                                            value={repasswordValue}
                                            onChange={this.changeForm("repasswordValue")}
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
                                <Button onClick={this.signup} sx={{marginTop: "20px"}} variant="contained">Sign up</Button>
                                <div style={{height: "1px", margin: "auto"}}></div>
                                <span className='singupButton_text'>Have a account already? Login in using</span>
                                <div onClick={this.toLogin} className='singupButton'>Login</div>
                            </FormControl>
                        </div>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className='loginBox_right'>
                        <img src="/static/cat.png" alt="" />
                    </div>
                </div>
                <MyAlert open={this.state.alert.open} closeAlert={this.closeAlert} _content={this.state.alert.content} _severity={this.state.alert.severity}/>
            </div>
        )
    }
}
