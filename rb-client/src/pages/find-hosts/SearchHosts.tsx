import './styles/search.scss'

import Schedule from './Schedule'
import React from "react";
import { Link, Route } from "react-router-dom";

import { Card, Grid, Typography, Paper, Button, FormControl, TextField, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

interface SearchProps {
    token: string | null
    bandName: string | null
    guestId: number | null
}

interface HostsState {
    hosts: Hosts
    open: boolean
    secondOpen: boolean
    thirdOpen: boolean
    state: string | null
    city: string | null
}

interface Hosts {
    hosts: HostsArr[]
}

interface HostsArr {
    firstName: string,
    lastName: string,
    streetAddress: string,
    city: string,
    state: string,
    zip: number
    id: number
}

class SearchHosts extends React.Component<SearchProps, HostsState>{

    constructor(props: SearchProps) {
        super(props)
        this.state = {
            hosts: {
                hosts: []
            },

            open: false,
            secondOpen: false,
            thirdOpen: false,
            state: null,
            city: null
        }
    }

    initData = async () => {
        const res = await fetch('http://localhost:3535/guest/hosts', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            })
        })
        const json = await res.json()
        this.setState({ hosts: json })
        console.log(this.state.hosts)
    }
 
    componentDidMount = () => {
        this.initData()
    }
    
    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    handleSecondClick = () => {
        this.setState({ secondOpen: !this.state.secondOpen })
        this.setState({thirdOpen: false})
    }
    
    handleThirdClick = () => {
        this.setState({thirdOpen: !this.state.thirdOpen})
        this.setState({secondOpen: false})
    }
    
    displayHosts = () => {
        return (
            <Grid container direction="row" justify="space-evenly">
                
                <form>
                    <TextField placeholder="City" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
                    <TextField placeholder="State" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
                    <IconButton>
                        <SearchIcon fontSize="small" />
                    </IconButton>
                </form>
                {this.state.hosts.hosts.map((host)=> {
                    return(
                        <Grid>
                            {this.state.state === host.state || this.state.city === host.city ? 
                            <Grid item key={Math.random().toString(36).substr(2, 9)}>
                            <Card className="books-container">
                                {this.state.open &&
                                    <Route path={`/hosts/schedule-with-${host.firstName}`}>
                                        <Schedule
                                            token={this.props.token}
                                            guestId={this.props.guestId}
                                            hostId={host.id}
                                            hostName={host.firstName}
                                            hostLast={host.lastName} />
                                    </Route>
                                }
                                <Grid container justify="center">
                                    <Typography className="books-header">{host.firstName} {host.lastName}</Typography>
                                </Grid>
                                <Grid container direction="column" justify="center" alignContent="center">
                                    <Paper className="address">
                                        <Typography>{host.streetAddress}</Typography>
                                        <Typography>{`${host.city}, ${host.state}`}</Typography>
                                        <Typography>{host.zip}</Typography>
                                    </Paper>
                                    <Link to={`/hosts/schedule-with-${host.firstName}`}>
                                        <Button onClick={this.handleClick} variant="outlined" color="primary" className="book-btn">Book</Button>
                                    </Link>
                                </Grid>
                            </Card>
                        </Grid>
                        : null}
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    render() {
        return (
            <Grid container direction="column" alignContent="center" justify="center">
                <Grid container direction="row" justify="space-evenly">
                    <h4 onClick={this.handleSecondClick}> All Hosts</h4>
                    <h4 onClick={this.handleThirdClick}>Search for hosts in your area</h4>
                </Grid>
                {this.state.thirdOpen && this.displayHosts()}

                {this.state.secondOpen &&
                    this.state.hosts.hosts.length > 0 ? (
                        this.state.hosts.hosts.map((host) => {
                            return (
                                <Grid item key={Math.random().toString(36).substr(2, 9)}>
                                    <Card className="books-container">
                                        {this.state.open &&
                                            <Route path={`/hosts/schedule-with-${host.firstName}`}>
                                                <Schedule
                                                    token={this.props.token}
                                                    guestId={this.props.guestId}
                                                    hostId={host.id}
                                                    hostName={host.firstName}
                                                    hostLast={host.lastName} />
                                            </Route>
                                        }
                                        <Grid container justify="center">
                                            <Typography className="books-header">{host.firstName} {host.lastName}</Typography>
                                        </Grid>
                                        <Grid container direction="column" justify="center" alignContent="center">
                                            <Paper className="address">
                                                <Typography>{host.streetAddress}</Typography>
                                                <Typography>{`${host.city}, ${host.state}`}</Typography>
                                                <Typography>{host.zip}</Typography>
                                            </Paper>
                                            <Link to={`/hosts/schedule-with-${host.firstName}`}>
                                                <Button onClick={this.handleClick} variant="outlined" color="primary" className="book-btn">Book</Button>
                                            </Link>
                                        </Grid>
                                    </Card>
                                </Grid>
                            )
                        })
                    ) : null}
            </Grid>
        )
    }
}

export default SearchHosts