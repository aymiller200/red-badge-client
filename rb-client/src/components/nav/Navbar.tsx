import './navbar.scss'
import React from "react";
import { Drawer, ListItem, List, ListItemText, IconButton, Grid, Divider, AppBar, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import HostRegister from '../auth/HostRegister';
import GuestRegister from '../auth/GuestRegister';




class NavBar extends React.Component {

    state = {
        open: false
    }

    handleClick = () => {

        this.setState({
            open: !this.state.open
        })

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
                                    <HostRegister />
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className="li" >
                                    <GuestRegister />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                    : null}
            </Grid>
        )
    }
}

export default NavBar