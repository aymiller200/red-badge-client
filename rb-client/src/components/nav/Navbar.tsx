import './navbar.scss'
import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import { Drawer, ListItem, List, ListItemText, IconButton, Grid, Divider, AppBar, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

import HostRegister from '../auth/HostRegister';
import GuestRegister from '../auth/GuestRegister';
import SearchHosts from '../../pages/find-hosts/SearchHosts';

interface NavProps {
    token: string | null
    hostToken: string | null
    guestUser: string | null
    guestId: number | null
    hostUser: string | null
    bandName: string | null
    setGuestId(id: number): void
    updateToken(newToken: string): void
    updateHostToken(hostToken: string): void
    setGuestUser(user: string): void
    setHostUser(hUser: string): void
    guestLogout(): void
    hostLogout(): void
    setBandName(band: string): void
}

class NavBar extends React.Component<NavProps> {

    state = {
        open: false
    }

    handleClick = () => {

        this.setState({
            open: !this.state.open
        })

    }

    displayNav = () => {
        if (!localStorage.getItem('guest-token')) {
            return (
                <List className="drawer" >
                    <ListItem>
                        <ListItemText className="li">
                            <h3 >Welcome!</h3>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <br />
                    <ListItem>
                        <ListItemText className="li">
                            <HostRegister
                                hostToken={this.props.token}
                                hostUser={this.props.hostUser}
                                updateHostToken={this.props.updateHostToken}
                                setHostUser={this.props.setHostUser}
                            />
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText className="li" >
                            <GuestRegister
                                token={this.props.token}
                                guestUser={this.props.guestUser}
                                guestId={this.props.guestId}
                                setGuestId={this.props.setGuestId}
                                updateToken={this.props.updateToken}
                                setGuestUser={this.props.setGuestUser}
                                bandName={this.props.bandName}
                                setBandName={this.props.setBandName}

                            />
                        </ListItemText>
                    </ListItem>
                </List>
            )
        } else {
            return (
               
                    <List className="drawer" >
                        <ListItem>
                            <ListItemText className="li">
                                <Grid container direction="row" alignContent="center" justify="center">
                                    <h3 >On Tour</h3>
                                    <AirportShuttleIcon className="nav-van" />
                                </Grid>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <br />
                        <ListItem>
                            <ListItemText className="li" >
                                <Link to="/hosts" className="li">
                                    <h4>Find Hosts</h4>
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="li" >
                                <h4 onClick={this.props.guestLogout}>Logout</h4>
                            </ListItemText>
                        </ListItem>
                    </List>
            )
        }
    }

    displayHostNav = () => {
        if (!localStorage.getItem('host-token')) {
            return (
                <List className="drawer" >
                    <ListItem>
                        <ListItemText className="li">
                            <h3 >Welcome!</h3>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <br />
                    <ListItem>
                        <ListItemText className="li">
                            <HostRegister
                                hostToken={this.props.token}
                                hostUser={this.props.hostUser}
                                updateHostToken={this.props.updateHostToken}
                                setHostUser={this.props.setHostUser}
                            />
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText className="li" >
                            <GuestRegister
                                token={this.props.token}
                                guestUser={this.props.guestUser}
                                guestId={this.props.guestId}
                                setGuestId={this.props.setGuestId}
                                setGuestUser={this.props.setGuestUser}
                                updateToken={this.props.updateToken}
                                bandName={this.props.bandName}
                                setBandName={this.props.setBandName}

                            />
                        </ListItemText>
                    </ListItem>
                </List>
            )
        } else {
            return (
                <List className="drawer" >
                    <ListItem>
                        <ListItemText className="li">
                            <h3 >On Tour</h3>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <br />
                    <ListItem>
                        <ListItemText className="li">
                            <h4>Your Books</h4>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText className="li" >
                            <h4>Find other Hosts</h4>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText className="li" >
                            <h4 onClick={this.props.hostLogout}>Logout</h4>
                        </ListItemText>
                    </ListItem>
                </List>
            )
        }
    }

    render() {
        return (
            <Grid container direction="row-reverse">
                <AppBar className="app-bar">
                    <IconButton className="menu-button" onClick={this.handleClick} >
                        {this.state.open ? <MenuOpenIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                    </IconButton>
                </AppBar>
                {this.state.open ? <Drawer anchor="left" open onClose={this.handleClick} variant="temporary">
                    <Box width={220} height={1}>
                        {this.props.token || localStorage.getItem('guest-token') ? this.displayNav() : this.displayHostNav()}
                    </Box>
                </Drawer>
                    : null}
            </Grid>
        )
    }
}

export default NavBar