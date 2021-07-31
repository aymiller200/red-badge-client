import './styles/guestRegister.scss'

import React from "react";
import APIURL from '../../helpers/environment';
import { Dialog, TextField, Grid, Button, DialogActions, FormControl, Typography, IconButton } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'


interface GuestRegProps {
    token: string | null
    guestUser: string | null
    bandName: string | null
    guestId: number | null
    setGuestId(id: number): void
    updateToken(newToken: string): void
    setGuestUser(user: string): void
    setBandName(band: string): void
}

interface GuestRegState{
    email: string | null
    username: string | null
    firstName: string | null
    lastName: string | null
    bandName: string | null
    password: string | null
    token: string | null
    open: boolean
    error: boolean
    errorOpen: boolean
}

class GuestRegister extends React.Component<GuestRegProps, GuestRegState> {

    constructor(props: GuestRegProps){
        super(props)
        this.state = {
            email: null,
            username: null,
            firstName: null,
            lastName: null,
            bandName: null,
            password: null,
            token: null,
            open: false,
            error: false,
            errorOpen: false
        }
    }

    handleSubmit = async (e: any) => {
        e.preventDefault()
        try{
        const res = await fetch(`${APIURL}/guest/register`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                bandName: this.state.bandName,
                password: this.state.password
            })
        });
        const json = await res.json()
        this.props.updateToken(json.token)
        this.props.setGuestUser(json.guest.username)
        this.props.setBandName(json.guest.bandName)
        this.props.setGuestId(json.guest.id)

      

    }catch(error){
        this.setState({ error: true, errorOpen: true })
    }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open,
            error: false,
            errorOpen: false,
            email: null,
            username: null,
            firstName: null,
            lastName: null,
            bandName: null,
            password: null
        })
    }
    
    render() {
        
        return (
            <div>
                <h4 onClick={this.handleClick}> Register as a Guest</h4>
                {this.state.open && <Dialog open >
                    <form onSubmit={this.handleSubmit} className='guest-reg-container'>
                        <FormControl>
                            <Typography className='guest-reg-title'>Musician on the Road? <br /> Register as a guest!</Typography>
                            {this.state.error && this.state.errorOpen ?
                                <Alert severity='error'  action={
                                    <IconButton
                                        aria-label='close'
                                        color='inherit'
                                        size='small'
                                        onClick={() => { this.setState({ errorOpen: false, error: false }) }}>
                                        <CloseIcon fontSize='inherit' />
                                    </IconButton>
                                }>User name is already taken!</Alert> : null}
                            <TextField
                                type='email'
                                required
                                label='Email'
                                variant='outlined'
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: '15px' }} />
                            <TextField
                                type='text'
                                required
                                label='Username'
                                variant='outlined'
                                value={this.state.username}
                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                style={{ margin: '15px' }} />
                            <Grid container direction='row' alignContent='center' justify='center'>
                                <TextField
                                    type='text'
                                    required
                                    label='First Name'
                                    variant='outlined'
                                    value={this.state.firstName}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                                    style={{ margin: '15px' }} 
                                    />
                                <TextField
                                    type='text'
                                    required
                                    label='Last Name'
                                    variant='outlined'
                                    value={this.state.lastName}
                                    onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                                    style={{ margin: '15px' }} 
                                   />
                            </Grid>
                            <TextField
                                required
                                type='text'
                                label='Band or Solo Project name'
                                variant='outlined'
                                value={this.state.bandName}
                                onChange={(e) => { this.setState({ bandName: e.target.value }) }}
                                style={{ margin: '15px' }} 
                                />
                            <TextField
                                required
                                type='password'
                                label='Password'
                                variant='outlined'
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                style={{ margin: '15px' }} />
                            <DialogActions>
                                <Button type='submit' variant='outlined' color='primary'>Submit</Button>
                                <Button onClick={this.handleClick} variant='outlined' color='secondary'>Close</Button>
                            </DialogActions>
                        </FormControl>
                    </form>
                </Dialog>}
            </div>
        )
    }
}

export default GuestRegister