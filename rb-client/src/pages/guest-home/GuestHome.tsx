import './styles/guestHome.scss'

import React from "react";
import Books from './Books';
import SearchHosts from '../find-hosts/SearchHosts'
import { Container, Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';



interface guestProfileProps {
    bandName: string | null
    token: string | null
    guestId: number | null
}

class GuestHome extends React.Component<guestProfileProps>{

    state = {
        open: false
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        console.log("token", this.props.token)
        console.log("id", this.props.guestId)

        return (
            <Container maxWidth="xl">
                <h4>{localStorage.getItem('band')}</h4>
                <Container maxWidth="xl" className="profile">
                    <Grid container direction="row" justify="flex-start">
                        <h4 onClick={this.handleClick} className="page-nav">Your Schedule</h4>
                        {/* <h4 className="about">About you</h4> */}
                    </Grid>
                    {this.state.open && <Grid item xs={12} md={4} lg={4} className="books-menu">
                        <Switch>
                            <Route path="/">
                                <Books token={this.props.token} guestId={this.props.guestId} />
                            </Route>
                        </Switch>
                    </Grid>}
                    <Route path="/hosts">
                        <SearchHosts token={this.props.token} bandName={this.props.token} guestId={this.props.guestId}/>
                    </Route>
                </Container>

            </Container>
        )
    }
}

export default GuestHome