import React, { Component } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Navigator from '../../components/Navigator'
import Contact from '../../components/Contact';
import ChatWindow from '../../components/ChatWindow';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Empty from '../../components/Empty';

export default class Meesage extends Component {

    componentDidMount(){
        const token = localStorage.getItem("token")
        if (token === undefined){
            this.props.history.push("/home/login")
        }
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <Grid style={{height: "inherit"}} container spacing={0}>
                    <Grid xs={"auto"} >
                        <Navigator/>
                    </Grid>
                    <Grid xs={true}>
                        <Contact/>
                    </Grid>
                    <Grid xs={2} sm={6} md={8}>
                        <Switch>
                            <Route path="/message/:groupId" component={ChatWindow}/>
                            <Route path="/message" component={Empty}/>
                            {/* <Redirect to="/home"/> */}
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
