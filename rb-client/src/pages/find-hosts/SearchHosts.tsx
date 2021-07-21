import './styles/search.scss'

import Schedule from './Schedule'

import { Card, Grid, Typography, Paper, Button, Dialog, TextField, IconButton } from "@material-ui/core";
import React from "react";
import { Link, Route } from "react-router-dom";
import Close from '@material-ui/icons/Close';



interface SearchProps{
    token: string | null
    bandName: string | null
    guestId: number | null
}

interface HostsState{
    hosts: Hosts
    open: boolean
}

interface Hosts{
    hosts: HostsArr[]
}

interface HostsArr{
    firstName: string, 
    lastName: string, 
    streetAddress: string, 
    city: string, 
    state: string, 
    zip: number
    id: number
}



class SearchHosts extends React.Component<SearchProps, HostsState>{

    constructor(props: SearchProps){
        super(props)
        this.state = {
            hosts:{
                hosts: []
            },
            
            open: false
        }
    }

    initData = async() => {
        const res = await fetch('http://localhost:3535/guest/hosts',{
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': `${localStorage.getItem('guest-token')}`
            })
        })
        const json = await res.json()
        this.setState({hosts: json})
        console.log(this.state.hosts)
    }

    componentDidMount = () =>{
        this.initData()
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    }


    render(){
        console.log(this.state.hosts.hosts.length)
        return(
            <Grid container direction="column" alignContent="center" justify="center">
                <h4>Search for hosts in your area</h4>
                <Link to='/'>Go back</Link>

                {this.state.hosts.hosts.length > 0 ? (
                    this.state.hosts.hosts.map((host) => {
                        return(
                            <Grid item key={Math.random().toString(36).substr(2, 9)}>
                            <Card className="books-container">
                            {this.state.open &&
                                
                                <Route path={`/hosts/schedule-with-${host.firstName}`}>
                                    <Schedule 
                                    token={this.props.token}
                                    guestId={this.props.guestId}
                                    hostId={host.id} 
                                    hostName={host.firstName}/>
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
                ): <p>No hosts in this area</p>}
            </Grid>
        )
    }
}

export default SearchHosts