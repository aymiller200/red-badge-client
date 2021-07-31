import './styles/guestHome.scss'

import React from "react";
import Books from './Books';
import SearchHosts from '../find-hosts/SearchHosts'
import About from './About'
import { Container, Grid, Box } from '@material-ui/core';
import { Route, Switch, Link } from 'react-router-dom';
import Footer from './guest-components/Footer';

interface GuestProfileProps {
    bandName: string | null
    token: string | null
    guestId: number | null
}

interface GuestProfileState {
    open: boolean,
    secondOpen: boolean
}

class GuestHome extends React.Component<GuestProfileProps, GuestProfileState>{

    constructor(props: GuestProfileProps) {
        super(props)
        this.state = {
            open: false,
            secondOpen: false
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })   
    }

    handleSecondClick = () => {
        this.setState({ secondOpen: !this.state.secondOpen })
        this.setState({ open: false })
    }

    render() {
        return (
            <Container maxWidth='xl' className='profile'>
                <Grid className='page-nav-container' container direction='row' ></Grid>
                <Grid container direction='row'>
                    <Grid item xs={12} md={4} lg={4}>
                    <Box className='find-bio'>
                        <h4 className='page-nav'>{localStorage.getItem('band')}</h4>
                        </Box>
                        <Grid item xs={12} md={12} lg={12}>
                        <About
                            token={this.props.token}
                            guestId={this.props.guestId}
                            bandName={this.props.bandName} />
                            </Grid>
                    </Grid>
                    <Grid  item xs={12} md={4} lg={4}>
                        <Box className='find-schedule'>
                        <Link to='/' className='link' onClick={this.handleClick}>
                            <h4  className='page-nav'>Your Schedule</h4>
                        </Link>
                        </Box>
                        <Grid container direction='row' justify='center' className='books-menu'>
                        {this.state.open &&
                        <Grid item xs={12} md={12} lg={12} className='books-menu'>
                            <Switch>
                                <Route path='/'>
                                    <Books token={this.props.token} guestId={this.props.guestId} />
                                </Route>
                            </Switch>
                        </Grid> }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Box onClick={this.handleSecondClick} className='find-hosts'>
                            <Link to='/hosts' className='link'>
                                <h4 className='page-nav'>Find Hosts</h4>
                            </Link>
                        </Box>
                        <Grid container direction='row' justify='center' className='books-menu'>
                        {this.state.secondOpen &&
                        <Grid item xs={12} md={12} lg={12}>
                            <Switch>
                                <Route path='/hosts'>
                                    <SearchHosts token={this.props.token} bandName={this.props.token} guestId={this.props.guestId} />
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

export default GuestHome