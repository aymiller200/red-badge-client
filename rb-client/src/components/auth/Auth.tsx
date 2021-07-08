import { Grid } from "@material-ui/core";
import React from "react";
import GuestLogin from './GuestLogin'
import HostLogin from './HostLogin'

class Auth extends React.Component {



    render() {
        return (
            <div>
                <Grid container alignContent="center" justify="center">
                    <GuestLogin />
                    <HostLogin />
                </Grid>
            </div>
        )
    }
}

export default Auth