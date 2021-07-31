import './styles/hostHome.scss'

import React from "react";

import HostBooks from './HostBooks'
import { Container, Grid, Box } from '@material-ui/core'
import { Switch, Route, Link } from 'react-router-dom'
import AboutHost from './AboutHost';
import Footer from './hostComponent/Footer';

interface HostHomeProps {
    hostId: number | null,
    hostToken: string | null
    hostUser: string | null
    hostFirst: string | null
    hostLast: string | null
}

interface HostHomeState {
    open: boolean
}

class HostHome extends React.Component<HostHomeProps, HostHomeState>{

    constructor(props: HostHomeProps) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {

        return (
            <Container maxWidth='xl' className='host-profile'>
                <Grid container direction='row' className='host-nav-container'></Grid>
                <Grid container direction='row' justify='space-evenly'>
                <Grid item xs={12} md={8} lg={8} className='host-bio-menu'>
                    <Box className='host-bio'> 
                    {this.props.hostFirst && this.props.hostLast ? 
                    <h4>{this.props.hostFirst} {this.props.hostLast}</h4> 
                    : <h4>{localStorage.getItem('host-first')} {localStorage.getItem('host-last')}</h4>}               
                    </Box>
                <Grid item xs={12} md={12} lg={12}>
                    <AboutHost 
                    hostId={this.props.hostId}
                    hostToken={this.props.hostToken}/>
                </Grid>
                </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Box onClick={this.handleClick} className='host-schedule'>
                            <Link to='/' className='link'>
                                <h4 >Your Schedule</h4>
                            </Link>
                        </Box>
                        <Grid container direction='row'
                            justify='center' className='host-books-menu'>
                            {this.state.open && <Grid item xs={12} md={12} lg={12} className='host-books-menu'>
                                <Switch>
                                    <Route path='/'>
                                        <HostBooks hostToken={this.props.hostToken} hostUser={this.props.hostUser} hostId={this.props.hostId} />
                                    </Route>
                                </Switch>

                            </Grid>}

                        </Grid>
                    </Grid>
                </Grid>
            <Footer />
            </Container>

        )

    }
}

export default HostHome