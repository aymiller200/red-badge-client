import React from "react";
import { Dialog, TextField, DialogTitle, Grid, Button, DialogActions, FormControl } from "@material-ui/core";


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

class GuestRegister extends React.Component<GuestRegProps> {


    state = {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        bandName: '',
        password: '',
        token: '',
        register: {},
        open: false,
    }

    handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3535/guest/register', {
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
        this.setState({ register: json })
        this.props.updateToken(json.token)
        this.props.setGuestUser(json.guest.username)
        this.props.setBandName(json.guest.bandName)
        this.props.setGuestId(json.guest.id)
        console.log(json)

        this.setState({
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            bandName: '',
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
            bandName: '',
            password: ''
        })
    }
    
    render() {
        
        return (
            <div>
                <h4 onClick={this.handleClick}> Register as a Guest</h4>
                {this.state.open && <Dialog open>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl>
                            <DialogTitle id='form-dialog-title'>Musician on the Road? <br /> Register as a guest!</DialogTitle>
                            <TextField
                                type="email"
                                required
                                label="Email"
                                variant="outlined"
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                style={{ margin: "15px" }} />
                            <TextField
                                type="text"
                                required
                                label="Username"
                                variant="outlined"
                                value={this.state.username}
                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                style={{ margin: "15px" }} />
                            <Grid container direction="row" alignContent="center" justify="center">
                                <TextField
                                    type="text"
                                    required
                                    label="First Name"
                                    variant="outlined"
                                    value={this.state.firstName}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                                <TextField
                                    type="text"
                                    required
                                    label="Last Name"
                                    variant="outlined"
                                    value={this.state.lastName}
                                    onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                                    style={{ margin: "15px" }} />
                            </Grid>
                            <TextField
                                required
                                type="text"
                                label="Band or Solo Project name"
                                variant="outlined"
                                value={this.state.bandName}
                                onChange={(e) => { this.setState({ bandName: e.target.value }) }}
                                style={{ margin: "15px" }} />
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
                                <Button onClick={this.handleClick} variant="outlined" color="secondary">Close</Button>
                            </DialogActions>
                        </FormControl>
                    </form>
                </Dialog>}
            </div>
        )
    }
}

export default GuestRegister