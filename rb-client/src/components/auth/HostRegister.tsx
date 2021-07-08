import React from "react";

import { Dialog, Grid, TextField, DialogTitle, Button, Divider } from '@material-ui/core'
import { DialogActions } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";

class HostRegister extends React.Component {
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
                <h4 onClick={this.handleClick}>Register as a Host</h4>
                {this.state.open && <Dialog open>
                    <DialogTitle id='form-dialog-title'>Have a spare couch for our tired friends on the road? <br /> Register as a Host!</DialogTitle>
                    <TextField id="outlined-basic" label="Email" variant="outlined" style={{ margin: "15px" }} />
                    <TextField id="outlined-basic" label="Username" variant="outlined" style={{ margin: "15px" }} />
                    <Divider />
                    <Grid container direction="row" justify="space-around">
                        <TextField id="outlined-basic" label="First Name" variant="outlined" style={{ margin: "15px" }} />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" style={{ margin: "15px" }} />
                        <TextField id="outlined-basic" label="Street Address" variant="outlined" style={{ margin: "15px" }} />
                        <TextField id="outlined-basic" label="City" variant="outlined" style={{ margin: "15px" }} />
                        <TextField id="outlined-basic" label="State" variant="outlined" style={{ margin: "15px" }} />
                        <TextField id="outlined-basic" label="Zip" variant="outlined" style={{ margin: "15px" }} />
                    </Grid>
                    <Divider />
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

export default HostRegister