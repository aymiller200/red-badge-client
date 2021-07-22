import './styles/guestHome.scss'

import React from "react";
import Books from './Books';
import SearchHosts from '../find-hosts/SearchHosts'
import { Container, Grid } from '@material-ui/core';
import { Route, Switch, Link } from 'react-router-dom';



interface guestProfileProps {
    bandName: string | null
    token: string | null
    guestId: number | null
}

class GuestHome extends React.Component<guestProfileProps>{

    state = {
        open: false,
        secondOpen: false
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
        this.setState({
            secondOpen: false
        })
    }

    handleSecondClick = () => {
        this.setState({ secondOpen: !this.state.secondOpen })
        this.setState({ open: false })
    }

    render() {
        console.log("token", this.props.token)
        console.log("id", this.props.guestId)

        return (
            <Container maxWidth="xl">
                <h4>{localStorage.getItem('band')}</h4>
                <Container maxWidth="xl" className="profile">
                    <Grid container direction="row" justify="space-evenly" >
                        <Link to="/" className="link">
                            <h4 onClick={this.handleClick} className="page-nav">Your Schedule</h4>
                            {/* <h4 className="about">About you</h4> */}
                        </Link>
                        <Link to="/hosts" className="link">
                            <h4 onClick={this.handleSecondClick} className="page-nav">Find Hosts</h4>
                        </Link>

                    </Grid>
                    <Grid container justify="space-evenly">
                        {this.state.open && <Grid item xs={12} md={4} lg={4} className="books-menu">
                            <Switch>
                                <Route path="/">
                                    <Books token={this.props.token} guestId={this.props.guestId} />
                                </Route>
                            </Switch>
                        </Grid>}
                        {this.state.secondOpen &&
                            <Grid item xs={12} md={4} lg={4} className="books-menu">
                                <Switch>
                                    <Route path="/hosts">
                                        <SearchHosts token={this.props.token} bandName={this.props.token} guestId={this.props.guestId} />
                                    </Route>
                                </Switch>
                            </Grid>}

                    </Grid>
                </Container>

            </Container>
        )
    }
}

export default GuestHome