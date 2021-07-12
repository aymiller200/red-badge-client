import React from "react";

import { Dialog, Grid, TextField, DialogTitle, Button, Divider, DialogActions, FormControl } from '@material-ui/core'

interface HostRegProps {
    hostToken: string | null
    hostUser: string | null
    updateHostToken(hostToken: string): void
    setHostUser(hUser: string): void
}

class HostRegister extends React.Component<HostRegProps> {


    state = {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        state: '',
        city: '',
        zip: '',
        password: '',
        token: '',
        register: {},
        open: false,
    }


    handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3535/host/register', {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
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
        this.setState({ register: json })
        this.props.updateHostToken(json.token)
        this.props.setHostUser(json.host.username)
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
                            <DialogTitle id='form-dialog-title'>Have a spare couch for our tired friends on the road? <br /> Register as a Host!</DialogTitle>

                            <TextField
                                required
                                type="email"
                                label="Email"
                                variant="outlined"
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: "15px" }} />
                            <TextField
                                required
                                type="text"
                                label="Username"
                                variant="outlined"
                                value={this.state.username}
                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                style={{ margin: "15px" }} />
                            <Divider />
                            <Grid container direction="row" justify="space-around">
                                <TextField
                                    required
                                    type="text"
                                    label="First Name"
                                    variant="outlined"
                                    value={this.state.firstName}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                                <TextField
                                    required
                                    type="text"
                                    label="Last Name"
                                    variant="outlined"
                                    value={this.state.lastName}
                                    onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                                <TextField
                                    required
                                    type="text"
                                    label="Street Address"
                                    variant="outlined"
                                    value={this.state.streetAddress}
                                    onChange={(e) => { this.setState({ streetAddress: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                                <TextField
                                    required
                                    type="text"
                                    label="City"
                                    variant="outlined"
                                    value={this.state.city}
                                    onChange={(e) => { this.setState({ city: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                                <TextField
                                    required
                                    label="State"
                                    variant="outlined"
                                    value={this.state.state}
                                    onChange={(e) => { this.setState({ state: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                                <TextField
                                    required
                                    type="number"
                                    label="Zip"
                                    variant="outlined"
                                    value={this.state.zip}
                                    onChange={(e) => { this.setState({ zip: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                            </Grid>
                            <Divider />
                            <TextField
                                required
                                type="password"
                                label="Password"
                                variant="outlined"
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                style={{ margin: "15px" }} />
                            <DialogActions>
                                <Button type="submit" variant="outlined" color="primary">Submit</Button>
                                <Button type="submit" onClick={this.handleClick} variant="outlined" color="secondary">Close</Button>
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