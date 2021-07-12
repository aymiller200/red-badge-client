import './styles/hostLogin.scss'

import React from "react";
import { Grid, TextField, Card, Button, FormControl, IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

interface HostProps {
    hostToken: string | null
    hostUser: string | null
    setHostUser(hUser:string): void
    updateHostToken(hostToken:string): void
}

class HostLogin extends React.Component<HostProps> {
    state = {
            email: '',
            password: '',
            login: {},
            error: false,
            open: false
        }
 

    handleSubmit = (e: any) => {
        e.preventDefault()
        fetch('http://localhost:3535/host/login', {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ login: json })
               this.props.updateHostToken(json.token)
               this.props.setHostUser(json.host.username)
                console.log(json)
            })
            .catch(err => {
                this.setState({ error: true, open: true })
                console.log(err)
            })
        this.setState({
            email: '',
            password: '',
        })

    }

    render() {
        return (

            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <Grid container direction="column" alignContent="center" justify="center" style={{ margin: "10px" }}>
                        <Card className="host-login">
                            {this.state.error &&
                                <Alert severity="error" action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => { this.setState({ open: false, error: false }) }}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>Your email or password is incorrect!</Alert>}
                            <h1 className="card-title" style={{ textAlign: "center" }}> Login as a Host</h1>
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: "15px", width: "30vw" }} />
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                style={{ margin: "15px", width: "30vw" }} />
                            <Button type="submit" color="primary" variant="contained" className="submit-button">Sign-in</Button>
                        </Card>
                    </Grid>
                </FormControl>
            </form>

        )
    }
}

export default HostLogin