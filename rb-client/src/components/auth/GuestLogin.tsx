import './styles/guestLogin.scss'

import React from "react";
import { Card, Grid, TextField, Button, FormControl, IconButton } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'


interface GuestProps {
    token: string | null;
    guestUser: string | null
    bandName: string | null
    guestId: number | null
    setGuestId(id:number): void
    updateToken(newToken: string): void
    setGuestUser(user: string): void
    setBandName(band: string): void
}

class GuestLogin extends React.Component<GuestProps> {
    state = {
        email: '',
        password: '',
        login: {},
        error: false,
        open: false,
    }

    handleSubmit = (e:any) => {
        e.preventDefault()
        fetch('http://localhost:3535/guest/login', {
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
                this.props.updateToken(json.token)
                this.props.setGuestUser(json.guest.username)
                this.props.setBandName(json.guest.bandName)
                this.props.setGuestId(json.guest.id)
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
            <form onSubmit={this.handleSubmit} >
                <FormControl>
                    <Grid container direction="column" alignContent="center" justify="center" style={{ margin: "10px" }}>
                        <Card className="guest-login">
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
                            <h1 className="card-title" style={{ textAlign: 'center' }}>Login as Guest</h1>
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: "15px", width: '30vw' }} />
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                style={{ margin: "15px", width: '30vw' }} />
                            <Button type="submit" variant="contained" color="primary" className="submit-button">Sign-in</Button>
                        </Card>
                    </Grid>
                </FormControl>
            </form>

        )
    }
}

export default GuestLogin