import './navbar.scss'
import React from "react";
import { Drawer, ListItem, List, ListItemText, IconButton, Grid, Divider, AppBar, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import HostRegister from '../auth/HostRegister';
import GuestRegister from '../auth/GuestRegister';

interface NavProps{
    token: string | null
    hostToken: string | null
    guestUser: string | null
    hostUser: string | null
    updateToken(newToken: string): void
    updateHostToken(hostToken: string): void
    setGuestUser(user: string): void
    setHostUser(hUser:string): void
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
        if(!this.props.token || !localStorage.getItem('guest-user')){
            return(
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
                                setHostUser={this.props.setHostUser} />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="li" >
                                <GuestRegister 
                                token={this.props.token} 
                                guestUser={this.props.guestUser}
                                updateToken={this.props.updateToken}
                                setGuestUser={this.props.setGuestUser}
                                />
                            </ListItemText>
                        </ListItem>
                        </List>
            )
        }else{
            return(
                <List className="drawer" >
                        <ListItem>
                            <ListItemText className="li">
                             <h3 >Welcome Guest!</h3>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <br />
                        <ListItem>
                            <ListItemText className="li">
                                <h4>Book</h4>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText className="li" >
                                <h4>Find Hosts</h4>
                            </ListItemText>
                        </ListItem>
                        </List>
            )
        }
    }

    displayHostNav = () => {
        if(!this.props.hostToken || !localStorage.getItem('host-user')){
            return(
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
                                setGuestUser={this.props.setGuestUser}
                                updateToken={this.props.updateToken}
                                />
                            </ListItemText>
                        </ListItem>
                        </List>
            )
        }else{
            return(
                <List className="drawer" >
                        <ListItem>
                            <ListItemText className="li">
                             <h3 >Welcome Host!</h3>
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
                      {this.props.token || localStorage.getItem('guest-user') ? this.displayNav(): this.displayHostNav()}
                    </Box>
                </Drawer>
                    : null}
            </Grid>
        )
    }
}

export default NavBar