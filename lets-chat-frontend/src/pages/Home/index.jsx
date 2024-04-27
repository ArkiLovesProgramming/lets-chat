import React, { Component } from 'react'
import Navigator from '../../components/Navigator'
import { Grid } from '@mui/material'
import LoginBox from './LoginBox'
import SignupBox from './SignupBox'
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom'

export default class Login extends Component {
  render() {
    return (
      <div style={{height: "100%"}}>
          <Grid style={{height: "inherit"}} container spacing={0}>
              <Grid xs={"auto"} item={true}>
                <Navigator/>
              </Grid>
              <Grid xs={true} item={true}>
                {/* <LoginBox/> */}
                  <Switch>
                    <Route path="/home/login" component={LoginBox} />
                    <Route path="/home/signup" component={SignupBox} />
                    <Redirect to="/home/login"/>
                  </Switch>
              </Grid>
          </Grid>
      </div>
    )
  }
}
