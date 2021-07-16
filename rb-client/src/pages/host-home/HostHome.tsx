import React from "react";

import HostBooks from './HostBooks'
import {Container, Grid} from '@material-ui/core'

interface hostHomeProps {
    hostId: number | null,
    hostToken: string | null
}

class HostHome extends React.Component<hostHomeProps>{
    render() {
        return (
            <Container maxWidth="xl">
                <h4>Welcome Host</h4>
                <Grid container direction="column">
                    <HostBooks hostToken={this.props.hostToken} hostId={this.props.hostId} />
                </Grid>

            </Container>

        )
    }
}

export default HostHome