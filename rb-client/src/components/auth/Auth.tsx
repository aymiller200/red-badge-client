import { Grid } from "@material-ui/core";
import React from "react";
import GuestLogin from './GuestLogin'
import HostLogin from './HostLogin'

interface AuthProps {
    token: string | null;
    hostToken: string | null
    guestUser: string | null
    hostUser: string | null
    updateHostToken(hostToken:string): void
    updateToken(newToken: string): void
    setGuestUser(user: string): void
    setHostUser(hUser:string): void

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
                    setGuestUser={this.props.setGuestUser}
                    />
                    <HostLogin 
                    hostToken={this.props.hostToken} 
                    updateHostToken={this.props.updateHostToken}
                    hostUser={this.props.hostUser}
                    setHostUser={this.props.setHostUser}
                    />
                </Grid>
            </div>
        )
    }
}

export default Auth