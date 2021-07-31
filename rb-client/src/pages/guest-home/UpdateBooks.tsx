import './styles/update.scss'

import APIURL from '../../helpers/environment';
import React from "react";
import { Link } from 'react-router-dom'
import { Card, Grid, CardContent, Typography, Paper, TextField, IconButton, Dialog, Tooltip, Input, InputAdornment, Button, Box } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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

interface UpdateState {
    updateActiveStartDate: boolean
    updateActiveEndDate: boolean
    updateActivePeopleStaying: boolean
    updateActiveNotes: boolean
    editStartDate: string
    editEndDate: string
    editNotes: string
    editPeopleStaying: string
}

class UpdateBooks extends React.Component<UpdateProps, UpdateState>{
    constructor(props: UpdateProps){
        super(props)
        this.state = {
            updateActiveStartDate: false,
            updateActiveEndDate: false,
            updateActivePeopleStaying: false,
            updateActiveNotes: false,
            editStartDate: this.props.startDate,
            editEndDate: this.props.endDate,
            editNotes: this.props.notes,
            editPeopleStaying: this.props.peopleStaying,
        }
    }

    editBook = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`${APIURL}/book/edit/${localStorage.getItem('id')}/${this.props.BookId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            }),
            body: JSON.stringify({
                startDate: this.state.editStartDate,
                endDate: this.state.editEndDate,
                peopleStaying: this.state.editPeopleStaying,
                notes: this.state.editNotes,
            })
        })
        await res.json()
        this.props.initData()

    }

    render() {
        return (
            <Dialog open className='edit-book'>
                <Box className='edit-title'>
                    <Grid container direction='row' justify='flex-end'>
                <Link to="/">
                    <IconButton className='exit'>
                        <CancelIcon fontSize='small' />
                    </IconButton>
                </Link>
                </Grid>
              
                <h4>Edit your stay!</h4>
               
                </Box>
                <Grid container md={12} className='edit-container'>
                    <Card className='books-container'>
                        <CardContent className='content'>
                            <Grid container direction='row' justify='space-evenly' >
                                <Typography gutterBottom className='books-header'>{`Staying with: ${this.props.firstName}`}</Typography>
                                <hr />
                                <Typography gutterBottom className='books-header' >{`In: ${this.props.city}`}, {this.props.state}</Typography>
                            </Grid>
                            <hr />
                            <Typography gutterBottom className='books-header'>Special notes: </Typography>
                            <Paper className='edit-me' >
                                {this.state.updateActiveNotes ?
                                    <form onSubmit={this.editBook}>
                                        <TextField
                                            fullWidth
                                            aria-label='Edit Notes'
                                            type='text'
                                            value={this.state.editNotes}
                                            onChange={(e) => this.setState({ editNotes: e.target.value })}
                                        />
                                    </form>
                                    :
                                    <Tooltip title='Edit notes'>
                                        <p onClick={() => this.setState({ updateActiveNotes: true })} className='notes'>{this.props.notes}</p>
                                    </Tooltip>
                                }

                            </Paper>
                            <Grid container direction='row' justify='space-between'>

                                {this.state.updateActivePeopleStaying ?
                                    <form onSubmit={this.editBook}>
                                        <TextField
                                            type='text'
                                            required
                                            aria-label='Edit the number of people staying'
                                            value={this.state.editPeopleStaying}
                                            onChange={(e) => this.setState({ editPeopleStaying: e.target.value })}
                                        />
                                    </form> :
                                    <Tooltip title='Edit the number of people staying'>
                                        <Typography onClick={() => this.setState({ updateActivePeopleStaying: true })} className='books-header edit-me'>{`People staying: ${this.props.peopleStaying}`}</Typography>
                                    </Tooltip>}
                                <hr />

                                {this.state.updateActiveStartDate ?
                                    <form onSubmit={this.editBook}>
                                        <Input
                                            type='date'
                                            id='date'
                                            aria-label='Edit start date'
                                            required
                                            value={this.state.editStartDate}
                                            onChange={(e) => this.setState({ editStartDate: e.target.value })} endAdornment={<InputAdornment position='end'>
                                            <Button type='submit'>
                                            <CheckBoxIcon color='primary'/>
                                            </Button>
                                        </InputAdornment>}
                                        />
                                    </form>
                                    :
                                    <Tooltip title='Edit start date'>
                                        <Typography onClick={() => this.setState({ updateActiveStartDate: true })} className='books-header edit-me'>{`From: ${this.props.startDate}`}</Typography>
                                    </Tooltip>
                                }
                                <hr />
                                {this.state.updateActiveEndDate ?
                                    <form onSubmit={this.editBook}>
                                        <Input
                                            type='date'
                                            id='date'
                                            aria-label='Edit end date'
                                            required
                                            value={this.state.editEndDate}
                                            onChange={(e) => this.setState({ editEndDate: e.target.value })}
                                            endAdornment={<InputAdornment position='end'>
                                            <Button type='submit'>
                                            <CheckBoxIcon color='primary'/>
                                            </Button>
                                            </InputAdornment>}
                                        />
                                    </form>
                                    :
                                    <Tooltip title='Edit end date'>
                                        <Typography onClick={() => this.setState({ updateActiveEndDate: true })} className='books-header edit-me'> To: {`${this.props.endDate}`}</Typography>
                                    </Tooltip>
                                }

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Dialog>
        )
    }
}

export default UpdateBooks