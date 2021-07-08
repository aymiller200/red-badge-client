import './styles/guestLogin.scss'

import React from "react";
import { Card, Grid, TextField, CardHeader, Button } from "@material-ui/core"

class GuestLogin extends React.Component {
    render() {
        return (
            <div>
                <form >
                    <Grid container direction="column" alignContent="center" justify="center" style={{ margin: "10px" }}>
                        <Card className="guest-login">
                            <h1 className="card-title" style={{textAlign: 'center'}}>Login as Guest</h1>
                            <TextField id="outlined-basic" label="Email" variant="outlined" style={{ margin: "15px", width: '30vw' }} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" style={{ margin: "15px", width: '30vw'}} />
                            <Button type="submit" variant="contained" color="primary" className="submit-button">Sign-in</Button>
                        </Card>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default GuestLogin