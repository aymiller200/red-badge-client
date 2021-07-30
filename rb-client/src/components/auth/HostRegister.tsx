import './styles/hostRegister.scss'

import React from "react";

import { Dialog, Grid, TextField, Button, Divider, DialogActions, FormControl, Typography } from '@material-ui/core'

interface HostRegProps {
    hostToken: string | null
    hostUser: string | null
    hostId: number | null
    hostFirst: string | null
    hostLast: string | null
    setHostFirst(first: string): void
    setHostLast(last: string): void
    setHostId(id: number): void
    updateHostToken(hostToken: string): void
    setHostUser(hUser: string): void
}

interface HostRegState{
    email: string | null
        username: string | null
        firstName: string | null
        lastName: string | null
        streetAddress: string | null
        state: string | null
        city: string | null
        zip: string | null
        password: string | null
        token: string | null
        open: boolean
}

class HostRegister extends React.Component<HostRegProps, HostRegState> {

    constructor(props: HostRegProps){
        super(props)
        this.state = {
            email: null,
            username: null,
            firstName: null,
            lastName: null,
            streetAddress: null,
            state: null,
            city: null,
            zip: null,
            password: null,
            token: null,
            open: false,
        }

    }




    handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3535/host/register', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                streetAddress: this.state.streetAddress,
                state: this.state.state,
                city: this.state.city,
                zip: this.state.zip,
                password: this.state.password,
            })
        });
        const json = await res.json()
        this.props.updateHostToken(json.token)
        this.props.setHostUser(json.host.username)
        this.props.setHostId(json.host.id)
        this.props.setHostFirst(json.host.firstName)
        this.props.setHostLast(json.host.lastName)
        console.log(json)
        this.setState({
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            streetAddress: '',
            state: '',
            city: '',
            zip: '',
            password: ''
        })
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open,
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            streetAddress: '',
            state: '',
            city: '',
            zip: '',
            password: '',
        })
    }
    render() {
        return (
            <div>
                <h4 onClick={this.handleClick}>Register as a Host</h4>
                {this.state.open && <Dialog open>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl>
                            <Typography className='host-register-title'>Have a heart, <br /> Register as a Host!</Typography>

                            <TextField
                                required
                                type='email'
                                label='Email'
                                variant='outlined'
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: '15px' }} />
                            <TextField
                                required
                                type='text'
                                label='Username'
                                variant='outlined'
                                value={this.state.username}
                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                style={{ margin: '15px' }} />
                            <Divider />
                            <Grid container direction='row' justify='space-around'>
                                <TextField
                                    required
                                    type='text'
                                    label='First Name'
                                    variant='outlined'
                                    value={this.state.firstName}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                                    style={{ margin: '15px' }} />
                                <TextField
                                    required
                                    type='text'
                                    label='Last Name'
                                    variant='outlined'
                                    value={this.state.lastName}
                                    onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                                    style={{ margin: '15px' }} />
                                <TextField
                                    required
                                    type='text'
                                    label='Street Address'
                                    variant='outlined'
                                    value={this.state.streetAddress}
                                    onChange={(e) => { this.setState({ streetAddress: e.target.value }) }}
                                    style={{ margin: '15px' }} />
                                <TextField
                                    required
                                    type='text'
                                    label='City'
                                    variant='outlined'
                                    value={this.state.city}
                                    onChange={(e) => { this.setState({ city: e.target.value }) }}
                                    style={{ margin: '15px' }} />
                                <TextField
                                    required
                                    label='State'
                                    variant='outlined'
                                    value={this.state.state}
                                    onChange={(e) => { this.setState({ state: e.target.value }) }}
                                    style={{ margin: '15px' }} />
                                <TextField
                                    required
                                    type='number'
                                    label='Zip'
                                    variant='outlined'
                                    value={this.state.zip}
                                    onChange={(e) => { this.setState({ zip: e.target.value }) }}
                                    style={{ margin: '15px' }} />
                            </Grid>
                            <Divider />
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
                                <Button type='submit' onClick={this.handleClick} variant='outlined' color='secondary'>Close</Button>
                            </DialogActions>
                        </FormControl>
                    </form>
                </Dialog>
                }
            </div>
        )
    }
}

export default HostRegister