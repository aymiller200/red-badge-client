import React from "react";
import { Drawer, Dialog, TextField, DialogTitle, Grid, Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";


class GuestRegister extends React.Component {
    // constructor(props:string){
    //     super(props) 
    //     this.state = {
    //         data: null, 
    //         url: 'http:localhost:3535/guest/register'
    //     }
    // }

    // initData = async() => {
    //     const response: string = await fetch(this.state.url, {
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     })
    // }

    state = {
        open: false
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <div>
                <h4 onClick={this.handleClick}> Register as a Guest</h4>
                {this.state.open && <Dialog open>
                    <DialogTitle id='form-dialog-title'>Musician on the Road? <br /> Register as a guest!</DialogTitle>
                    <TextField id="outlined-basic" label="Email" variant="outlined" style={{ margin: "15px" }} />
                    <TextField id="outlined-basic" label="Username" variant="outlined" style={{ margin: "15px" }} />
                    <Grid container direction="row" alignContent="center" justify="center">
                        <TextField id="outlined-basic" label="First Name" variant="outlined" style={{ margin: "15px" }} />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" style={{ margin: "15px" }} />
                    </Grid>
                    <TextField id="outlined-basic" label="Band or Solo Project name" variant="outlined" style={{ margin: "15px" }} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" style={{ margin: "15px" }} />
                    <DialogActions>
                        <Button type="submit" variant="outlined" color="primary">Submit</Button>
                        <Button type="submit" onClick={this.handleClick} variant="outlined" color="secondary">Close</Button>
                    </DialogActions>

                </Dialog>}
            </div>
        )
    }
}

export default GuestRegister