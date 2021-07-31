import React from "react";
import APIURL from "../../helpers/environment";
import { Card, Grid, CardContent, Typography, Paper, IconButton } from '@material-ui/core'
import { Route, Link } from 'react-router-dom'
import HostDetails from './HostDetails'
import MenuBookIcon from '@material-ui/icons/MenuBook';

interface hostBooksProps {
    hostId: number | null,
    hostToken: string | null
    hostUser: string | null
}

interface BooksState {
    books: BooksArr
    url: RequestInfo
    open: boolean
    notes?: string
    token?: string | null
    guestId?: number | null
}

interface BooksArr {
    bookings: Booking[]
}

interface Booking {
    Guest: Guest,
    peopleStaying: string,
    notes: string,
    HostId: number,
    GuestId: number
    BookId: number
    startDate: string,
    endDate: string
    id: number
    username: string

}

interface Guest {
    firstName: string,
    bandName: string

}

class HostBooks extends React.Component<hostBooksProps, BooksState>{

    constructor(props: hostBooksProps) {
        super(props)
        this.state = {
            books: {
                bookings: []
            },
            url: `${APIURL}/book/host-schedule/${this.props.hostId}`,
            open: false
        }
    }

    initData = async () => {
        if (this.props.hostToken && this.props.hostId) {
            const res = await fetch(this.state.url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.hostToken}`
                })
            })
            const json = await res.json()
            this.setState({ books: json })
        } else {
            const res = await fetch(`${APIURL}/book/host-schedule/${localStorage.getItem('host-id')}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('host-token')}`
                })
            })
            const json = await res.json()
            this.setState({ books: json })
            console.log(this.state.books)
        }
    }

    handleClick = () => {
        this.setState({
            open: true
        })
    }

    componentDidMount = () => {
        this.initData()
    }

    render() {
        return (
            <div>
                {this.state.books?.bookings?.length > 0 ?
                    this.state.books?.bookings?.map((schedule) => {
                        return (
                            <Grid item key={Math.random().toString(36).substr(2, 9)} >


                                <Card className='books-container' onClick={this.handleClick}>
                                    <Grid container direction='row' justify='space-evenly' >
                                        <Typography gutterBottom className='books-header'>{`Guest: ${schedule?.Guest.firstName}`}</Typography>
                                        <Typography className='books-header'>{`Band: ${schedule?.Guest.bandName}`}</Typography>
                                    </Grid>
                                    <hr />
                                    <CardContent>
                                        <Typography gutterBottom className='books-header'>Special notes: </Typography>
                                        <Paper>
                                            {schedule.notes ?
                                                <p className='notes'>{schedule.notes}</p>
                                                : <p className='no-notes notes'>They didn't leave any notes!</p>}
                                        </Paper>
                                        <Grid container direction='row' justify='space-between'>
                                            <Typography className='books-header'>{`People staying: ${schedule?.peopleStaying}`}</Typography>

                                            <Typography className='books-header'>{`From ${schedule?.startDate} to ${schedule?.endDate}`}</Typography>
                                        </Grid>
                                    </CardContent>
                                    <Grid container justify='flex-end'>
                                        <Link to={`/${schedule.Guest.firstName}/${schedule.id}`} className='link' >
                                            <IconButton>
                                                <MenuBookIcon onClick={() => this.setState({ open: true })} fontSize='small' />
                                            </IconButton>
                                        </Link>
                                    </Grid>
                                </Card>
                                {this.state.open ?

                                    <Route exact path={`/${schedule.Guest.firstName}/${schedule.id}`}>
                                        <HostDetails
                                            hostId={this.props.hostId}
                                            bandName={schedule.Guest.bandName}
                                            hostToken={this.props.hostToken}
                                            hostUser={this.props.hostUser}
                                            firstName={schedule.Guest.firstName}
                                            peopleStaying={schedule.peopleStaying}
                                            notes={schedule.notes}
                                            startDate={schedule.startDate}
                                            endDate={schedule.endDate}
                                            id={schedule.id}
                                            GuestId={schedule.GuestId}
                                            HostId={schedule.HostId}
                                            BookId={schedule.BookId}
                                            username={schedule.username}

                                        />
                                    </Route>
                                    : null}

                            </Grid>
                        )
                    }) : <h4>No one has booked with you yet!</h4>}

            </div >
        )
    }
}

export default HostBooks