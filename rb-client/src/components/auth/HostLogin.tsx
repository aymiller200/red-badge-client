import './styles/hostLogin.scss'

import React from "react";
import { Box, Grid, TextField, Card, CardHeader, Button } from '@material-ui/core'

class HostLogin extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <Grid container direction="column" alignContent="center" justify="center" style={{ margin: "10px" }}>
                        <Card className="host-login">
                            <h1 className="card-title" style={{ textAlign: "center" }}> Login as a Host</h1>
                            <TextField id="outlined-basic" label="Email" variant="outlined" style={{ margin: "15px", width: "30vw" }} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" style={{ margin: "15px", width: "30vw" }} />
                            <Button type="submit" color="primary" variant="contained" className="submit-button">Sign-in</Button>
                        </Card>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default HostLogin