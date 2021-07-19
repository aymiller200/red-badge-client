import React from "react";

import HostBooks from './HostBooks'
import {Container, Grid} from '@material-ui/core'
import {Switch, Route} from 'react-router-dom'

interface hostHomeProps {
    hostId: number | null,
    hostToken: string | null
    hostUser: string | null
}

class HostHome extends React.Component<hostHomeProps>{

    state= {
        open: false
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {

        return (
            <Container maxWidth="xl">
                <h4>Welcome Host</h4>
                <Grid container direction="column">
                </Grid>
                <h4 onClick={this.handleClick} className="page-nav">Your Schedule</h4>
                    {this.state.open && <Grid item xs={12} md={4} lg={4} className="books-menu">
                        <Switch>
                            <Route path="/">
                                <HostBooks  hostToken={this.props.hostToken} hostUser={this.props.hostUser} hostId={this.props.hostId} />
                            </Route>
                        </Switch>
                        
                    </Grid>}

            </Container>

        )
    }
}

export default HostHome