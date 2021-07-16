import { Grid } from "@material-ui/core";
import React from "react";
import GuestLogin from './GuestLogin'
import HostLogin from './HostLogin'

interface AuthProps {
    token: string | null;
    hostToken: string | null
    guestUser: string | null
    hostUser: string | null
    bandName: string | null
    guestId:number | null
    hostId: number | null, 
    setHostId(id:number): void
    setGuestId(id: number): void
    updateHostToken(hostToken: string): void
    updateToken(newToken: string): void
    setGuestUser(user: string): void
    setHostUser(hUser: string): void
    setBandName(band: string): void

}

class Auth extends React.Component<AuthProps> {



    render() {
        //console.log('Auth', this.props.token)
        return (
            <div>
                <Grid container alignContent="center" justify="center">
                    <GuestLogin
                        token={this.props.token}
                        updateToken={this.props.updateToken}
                        guestUser={this.props.guestUser}
                        guestId={this.props.guestId}
                        setGuestId={this.props.setGuestId}
                        setGuestUser={this.props.setGuestUser}
                        bandName={this.props.bandName}
                        setBandName={this.props.setBandName}
                    />
                    <HostLogin
                        hostToken={this.props.hostToken}
                        hostUser={this.props.hostUser}
                        hostId={this.props.hostId}
                        setHostId={this.props.setHostId}
                        updateHostToken={this.props.updateHostToken}
                        setHostUser={this.props.setHostUser}
                    />
                </Grid>
            </div>
        )
    }
}

export default Auth