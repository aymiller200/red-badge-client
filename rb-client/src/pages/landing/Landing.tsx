import './landing.scss'

import React from "react";
import Auth from '../../components/auth/Auth'

import { Container, Grid, CardActions, Box } from '@material-ui/core'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

interface LandingProps {
    token: string | null,
    hostToken: string | null
    guestUser: string | null
    hostUser: string | null
    bandName: string | null
    guestId: number | null
    hostId: number | null, 
    setHostId(id:number): void
    setGuestId(id:number): void
    updateToken(newToken: string): void
    updateHostToken(hostToken: string): void
    setGuestUser(user: string): void
    setHostUser(hUser: string): void
    setBandName(band:string): void
}

class Landing extends React.Component<LandingProps> {

    render() {
        //console.log('landing', this.props.token)
        return (

            <Grid container direction="row" alignContent="center" justify="center">
                <h1 className="title">On Tour</h1>
                <AirportShuttleIcon className="van" />
                <Container className="landing" maxWidth="xl">
                    <Grid container direction="row-reverse" alignContent="center" justify="center">
                        <Box className="text-card" width="100%" height="auto">
                            <CardActions>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fugiat, dolore impedit dolorem rem ipsam nemo! Rerum harum voluptates sunt. Ullam dolorum commodi, maiores perspiciatis mollitia ex molestiae nobis aliquid? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe alias hic repellat! Porro facere possimus dignissimos tenetur sed voluptate aliquam, rerum tempore placeat neque doloremque sint distinctio commodi laudantium ipsa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis illo itaque id aperiam perferendis amet dicta quae labore. Recusandae fugit sit ab odit sed quae culpa corrupti dolorem quas omnis Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur a eligendi sit minus perferendis harum numquam necessitatibus tempore molestias praesentium beatae vero repudiandae, recusandae expedita officia modi totam natus corrupti?
                            </CardActions>
                        </Box>
                    </Grid>
                    <Box className="auth-card" height="auto">
                        <Auth
                            token={this.props.token}
                            updateToken={this.props.updateToken}
                            hostToken={this.props.hostToken}
                            guestId={this.props.guestId}
                            hostId={this.props.hostId}
                            setHostId={this.props.setHostId}
                            setGuestId={this.props.setGuestId}
                            updateHostToken={this.props.updateHostToken}
                            guestUser={this.props.guestUser}
                            hostUser={this.props.hostUser}
                            setGuestUser={this.props.setGuestUser}
                            setHostUser={this.props.setHostUser}
                            bandName={this.props.bandName}
                            setBandName={this.props.setBandName}
                        />
                    </Box>

                </Container>
            </Grid>

        )
    }
}

export default Landing