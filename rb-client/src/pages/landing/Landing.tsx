import './landing.scss'

import React from "react";
import Auth from '../../components/auth/Auth'

import { Container, Grid, CardActions, Box, Typography } from '@material-ui/core'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

interface LandingProps {
    token: string | null,
    hostToken: string | null
    guestUser: string | null
    hostUser: string | null
    bandName: string | null
    guestId: number | null
    hostId: number | null,
    hostFirst: string | null
    hostLast: string | null
    setHostFirst(first: string): void
    setHostLast(last: string): void
    setHostId(id: number): void
    setGuestId(id: number): void
    updateToken(newToken: string): void
    updateHostToken(hostToken: string): void
    setGuestUser(user: string): void
    setHostUser(hUser: string): void
    setBandName(band: string): void
}

class Landing extends React.Component<LandingProps> {

    render() {
        return (

            <Grid container direction='row' alignContent='center' justify='center'>
                <h1 className='title'>On Tour</h1>
                <AirportShuttleIcon className='van' />
                <Container className='landing' maxWidth='xl'>
                    <Grid container direction='row-reverse' alignContent='center' justify='center'>
                        <Box className='text-card' width='100%' height='auto'>
                            <CardActions>
                                <Typography className='landing-text'>
                                Welcome to OnTour, a website aimed towards helping musicians who are, well, on tour! Being on the road, playing shows, and meeting new friends is a one of a kind experience, but finding a safe place to crash for the night in an unfamiliar city can be a daunting task, coupled with quite a bit of anxiety. Good news is, we're here to help alleviate some of those bad vibes to ensure you can keep groovin' on to wherever else the road takes you. <br /> We believe in musicians helping musicians, so if you have a couch, air mattress, futon, and/or a floor with some soft carpet go ahead and return the favor by also registering as a host! Happy trails and righteous riffs, friends!
                                </Typography>
                            </CardActions>
                        </Box>
                    </Grid>
                    <Box className='auth-card' height='auto'>
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
                            hostFirst={this.props.hostFirst}
                            hostLast={this.props.hostLast}
                            setHostFirst={this.props.setHostFirst}
                            setHostLast={this.props.setHostLast}
                        />
                    </Box>

                </Container>
            </Grid>

        )
    }
}

export default Landing