import './styles/guestLogin.scss'

import React from "react";
import { Card, Grid, TextField, Button, FormControl, IconButton } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

interface GuestLoginProps {
    token: string | null;
    guestUser: string | null
    bandName: string | null
    guestId: number | null
    setGuestId(id: any): void
    updateToken(newToken: string): void
    setGuestUser(user: string): void
    setBandName(band: string): void
}

interface GuestLoginState {
    email: string | null,
    password: string | null,
    error: boolean,
    open: boolean
}

class GuestLogin extends React.Component<GuestLoginProps, GuestLoginState> {

    constructor(props: GuestLoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false,
            open: false,
        }
    }

    handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3535/guest/login', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
            })
            const json = await res.json()
            this.props.updateToken(json.token)
            this.props.setGuestUser(json.guest.username)
            this.props.setBandName(json.guest.bandName)
            this.props.setGuestId(json.guest.id)
        } catch (error) {
            this.setState({ error: true, open: true })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <FormControl>
                    <Grid container direction='column' alignContent='center' justify='center' style={{ margin: '10px' }}>
                        <Card className='guest-login'>
                            {this.state.error &&
                                <Alert severity='error' action={
                                    <IconButton
                                        aria-label='close'
                                        color='inherit'
                                        size='small'
                                        onClick={() => { this.setState({ open: false, error: false }) }}>
                                        <CloseIcon fontSize='inherit' />
                                    </IconButton>
                                }>Your email or password is incorrect!</Alert>}
                            <h1 className="card-title" style={{ textAlign: 'center' }}>Login as Guest</h1>
                            <TextField
                                type='email'
                                label='Email'
                                variant='outlined'
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: '15px', width: '30vw' }} />
                            <TextField
                                type='password'
                                label='Password'
                                variant='outlined'
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                style={{ margin: '15px', width: '30vw' }} />
                            <Button type='submit' variant='outlined' color='primary' className='submit-button'>Sign-in</Button>
                        </Card>
                    </Grid>
                </FormControl>
            </form>
        )
    }
}

export default GuestLogin