import './styles/update.scss'

import React from "react";
import { Link } from 'react-router-dom'
import { Card, Grid, CardContent, Typography, Paper, TextField, IconButton, Dialog } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';

interface UpdateProps {
    token: string | null
    guestId: number | null
    startDate: string
    endDate: string
    firstName: string
    peopleStaying: string
    city: string
    state: string
    notes: string
    BookId: number
    initData(): void

}

class UpdateBooks extends React.Component<UpdateProps>{

    state = {
        updateActiveStartDate: false,
        updateActiveEndDate: false,
        updateActivePeopleStaying: false,
        updateActiveNotes: false,
        editStartDate: this.props.startDate,
        editEndDate: this.props.endDate,
        editNotes: this.props.notes,
        editPeopleStaying: this.props.peopleStaying,
    }


    editBook = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3535/book/edit/${localStorage.getItem('id')}/${this.props.BookId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            }),
            body: JSON.stringify({
                //username: localStorage.getItem('guest-user'),
                startDate: this.state.editStartDate,
                endDate: this.state.editEndDate,
                peopleStaying: this.state.editPeopleStaying,
                notes: this.state.editNotes,
                // GuestId: localStorage.getItem('id'), 
                // HostId: this.props.hostId
            })
        })
        await res.json()
        this.props.initData()

    }


    render() {
        return (
            <Dialog open className="edit-book">
                <Link to="/">
                    <IconButton className="exit">
                        <CancelIcon fontSize="small" />
                    </IconButton>
                </Link>
                <Grid container md={12} className="edit-container">
                    <Card className="books-container">
                        <CardContent className="content">
                            <Grid container direction="row" justify="space-evenly" >
                                <Typography gutterBottom className="books-header">{`Staying with: ${this.props.firstName}`}</Typography>
                                <hr />
                                <Typography gutterBottom className="books-header" >{`In: ${this.props.city}`}, {this.props.state}</Typography>
                            </Grid>
                            <hr />
                            <Typography gutterBottom className="books-header">Special notes: </Typography>
                            <Paper className="edit-me" >
                                {this.state.updateActiveNotes ?
                                    <form onSubmit={this.editBook}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            value={this.state.editNotes}
                                            onChange={(e) => this.setState({ editNotes: e.target.value })}
                                        />
                                    </form>
                                    : <p onClick={() => this.setState({ updateActiveNotes: true })} className="notes">{this.props.notes}</p>}

                            </Paper>
                            <Grid container direction="row" justify="space-between">

                                {this.state.updateActivePeopleStaying ?
                                    <form onSubmit={this.editBook}>
                                        <TextField
                                            type="text"
                                            required
                                            value={this.state.editPeopleStaying}
                                            onChange={(e) => this.setState({ editPeopleStaying: e.target.value })}
                                        />
                                    </form> :
                                    <Typography onClick={() => this.setState({ updateActivePeopleStaying: true })} className="books-header edit-me">{`People staying: ${this.props.peopleStaying}`}</Typography>}
                                <hr />

                                {this.state.updateActiveStartDate ?
                                    <form onSubmit={this.editBook}>
                                        <TextField
                                            type="text"
                                            required
                                            value={this.state.editStartDate}
                                            onChange={(e) => this.setState({ editStartDate: e.target.value })}
                                        />
                                    </form>
                                    : <Typography onClick={() => this.setState({ updateActiveStartDate: true })} className="books-header edit-me">{`From: ${this.props.startDate}`}</Typography>}
                                <hr />
                                {this.state.updateActiveEndDate ? 
                                    <form onSubmit={this.editBook}>
                                    <TextField
                                        type="text"
                                        required
                                        value={this.state.editEndDate}
                                        onChange={(e) => this.setState({ editEndDate: e.target.value })}
                                    />
                                </form>
                                : <Typography onClick={() => this.setState({ updateActiveEndDate: true })} className="books-header edit-me"> To: {`${this.props.endDate}`}</Typography>}
                                
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Dialog>
        )
    }
}

export default UpdateBooks