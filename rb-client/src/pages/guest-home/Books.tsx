import './styles/books.scss'

import Details from './Details'
import React from 'react'
import { Route, Link } from 'react-router-dom'

import { Card, Grid, CardContent, Typography, Paper, Box, IconButton , Container} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import UpdateBooks from './UpdateBooks'

interface BooksProps {
    token: string | null
    guestId: number | null
}

interface BooksState {
    books: BooksArr
    url: RequestInfo
    open: boolean
    updateActive: boolean
    notes?: string
    token?: string | null
    guestId?: number | null
}

interface BooksArr {
    bookings: Booking[]
}

interface Booking {
    Host: Host,
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

interface Host {
    firstName: string,
    city: string,
    state: string
}

class Books extends React.Component<BooksProps, BooksState> {

    constructor(props: BooksProps) {
        super(props)
        this.state = {
            books: {
                bookings: []
            },
            url: `http://localhost:3535/book/schedule/${this.props.guestId}`,
            open: false,
            updateActive: false,

        }
    }

    initData = async () => {
        if (this.props.token && this.props.guestId) {
            const res = await fetch(this.state.url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
            })
            const json = await res.json()
            this.setState({ books: json })
            console.log(this.state.books)
        } else {
            const res = await fetch(`http://localhost:3535/book/schedule/${localStorage.getItem('id')}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ books: json })
        }
    }

    deleteBook = async (book: any) => {
        const res = await fetch(`http://localhost:3535/book/delete/${localStorage.getItem('id')}/${book.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            })
        })
        await res.json()
        this.initData()
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
            <Container className='profile'>
            <Box className='menu-box'>

                {this.state?.books.bookings.length > 0 ? (
                    this.state?.books.bookings?.map((schedule: Booking) => {
                        return (
                            <Grid item key={Math.random().toString(36).substr(2, 9)}>
                                            {this.state.updateActive &&
                                                <Route path={`/edit/${schedule.id}`}>
                                                    <UpdateBooks
                                                        token={this.props.token}
                                                        guestId={this.props.guestId}
                                                        startDate={schedule.startDate}
                                                        endDate={schedule.endDate}
                                                        firstName={schedule.Host.firstName}
                                                        peopleStaying={schedule.peopleStaying}
                                                        city={schedule.Host.city}
                                                        state={schedule.Host.state}
                                                        notes={schedule.notes}
                                                        initData={this.initData} 
                                                        BookId={schedule.id}  
                                                    />
                                                    </Route>
                                            }
                                <Card onClick={this.handleClick} className='books-container' >
                                    <Link to={`/${schedule.Host.firstName}/${schedule.id}`} className="link" >
                                        <CardContent className='content'>

                                            <Grid container direction='row' justify='space-evenly' >
                                                <Typography gutterBottom className='books-header'>{`Staying with: ${schedule?.Host.firstName}`}</Typography>
                                                <Typography gutterBottom className='books-header' >{`In: ${schedule?.Host.city}`}, {schedule?.Host.state}</Typography>
                                            </Grid>
                                            <hr />
                                            <Typography gutterBottom className='books-header'>Special notes: </Typography>
                                            <Paper>
                                                <p className='notes'>{schedule?.notes}</p>
                                            </Paper>
                                            <Grid container direction='row' justify='space-between'>
                                                <Typography className='books-header'>{`People staying: ${schedule?.peopleStaying}`}</Typography>

                                                <Typography className='books-header'>{`From ${schedule?.startDate} to ${schedule?.endDate}`}</Typography>
                                            </Grid>
                                        </CardContent>
                                    </Link>
                                    <Grid container justify='flex-end'>
                                        <Link to={`/edit/${schedule.id}`}>
                                        <IconButton className='edit'>
                                            <EditIcon onClick={() => this.setState({ updateActive: true })} fontSize='small' />
                                        </IconButton>
                                        </Link>
                                        <IconButton className='delete'>
                                            <CancelIcon onClick={() => this.deleteBook(schedule)} fontSize='small' />
                                        </IconButton>
                                    </Grid>
                                </Card>
                                {this.state.open ?
                                    <Route exact path={`/${schedule.Host.firstName}/${schedule.id}`}>
                                        <Details
                                            token={this.props.token}
                                            guestId={this.props.guestId}
                                            firstName={schedule.Host.firstName}
                                            city={schedule.Host.city}
                                            state={schedule.Host.state}
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
                    })) : <h4>You don't have any stays scheduled!</h4>}
            </Box>
            </Container>
        )
    }
}

export default Books