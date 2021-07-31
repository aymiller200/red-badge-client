import './styles/schedule.scss'

import React from "react";
import { Dialog, TextField, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

interface ScheduleProps {
    token: string | null
    guestId: number | null
    hostId: number
    hostName: string
    hostLast: string
}

interface ScheduleState{
    username: string
    startDate: string
    endDate: string
    notes: string
    peopleStaying: string
    open: boolean
}

class Schedule extends React.Component<ScheduleProps, ScheduleState>{
    constructor(props: ScheduleProps){
        super(props)
        this.state = {
            username: '',
            startDate: '',
            endDate: '',
            notes: '',
            peopleStaying: '',
            open: false
        }
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    book = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3535/book/schedule/${localStorage.getItem('id')}`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            }),
            body: JSON.stringify({
                username: localStorage.getItem('guest-user'),
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                peopleStaying: this.state.peopleStaying,
                notes: this.state.notes,
                GuestId: localStorage.getItem('id'),
                HostId: this.props.hostId
            })
        })
        await res.json()
        this.setState({ 
        startDate: '', 
        endDate: '', 
        notes: '', 
        peopleStaying: '' })

    }

    render() {
        return (
            <Dialog open>
                <form onSubmit={this.book} >
                    <Grid container justify='center' className='header'>
                    <h4>Booking with: {this.props.hostName} {this.props.hostLast}</h4>
                    </Grid>
                    <Grid container direction='column' className='booking-form' >
                        <Grid container direction='row' justify='space-between' className='dates'>
                            <TextField
                                type='date'
                                required
                                id='date'
                                aria-label='Start Date'
                                margin='normal'
                                className='start'
                                value={this.state.startDate}
                                onChange={(e) => this.setState({ startDate: e.target.value })} />
                            <TextField
                                type='date'
                                id='date'
                                required
                                aria-label='End Date'
                                margin='normal'
                                className='end'
                                value={this.state.endDate}
                                onChange={(e) => this.setState({ endDate: e.target.value })} />
                        </Grid>
                        <Grid container justify='center'>
                        <TextField
                            type='number'
                            required
                            aria-label='People Staying'
                            placeholder='People Staying'
                            className='people-staying'
                            value={this.state.peopleStaying}
                            onChange={(e) => this.setState({ peopleStaying: e.target.value })} />
                        </Grid>
                        <Grid container justify='center'>
                        <TextField
                            type='text'
                            fullWidth
                            aria-label='Special Notes'
                            placeholder='Special notes?'
                            variant='outlined'
                            className='notes'
                            value={this.state.notes}
                            onChange={(e) => this.setState({ notes: e.target.value })} />
                        </Grid>
                        <Grid className='book-actions' container direction='row' justify='flex-end'>
                        <Button type='submit' color='primary'>Submit</Button>
                        <Link to='/hosts' className='link'>
                            <Button color='secondary' onClick={this.handleClick}>Close</Button>
                        </Link>
                        </Grid>
                    </Grid>
                </form>

            </Dialog>

        )
    }
}

export default Schedule