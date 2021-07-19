import React from 'react'
import './styles/books.scss'
import { Card, Grid, CardContent, Typography, Paper, Box } from '@material-ui/core'
import { Route, Link } from 'react-router-dom'
import Details from './Details'


interface BooksProps {
    token: string | null
    guestId: number | null
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
    Host: Host,
    peopleStaying: string,
    notes: string,
    HostId: number,
    GuestId: number
    BookId: number
    startDate: string,
    endDate: string
    id: number | null
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
            open: false
        }
    }

    handleClick = () => {
        this.setState({
            open: true
        })
    }

    initData = async () => {
        if (this.props.token && this.props.guestId) {
            const res = await fetch(this.state.url, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.token}`
                }),
            })
            const json = await res.json()
            this.setState({ books: json })
            console.log(this.state.books)


        } else {
            const res = await fetch(`http://localhost:3535/book/schedule/${localStorage.getItem('id')}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('guest-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ books: json })
            
            console.log('->', this.state.books)
        }
    }


    componentDidMount = () => {
        this.initData()

    }

    render() {
        return (
            <Box className="menu-box">

                {this.state?.books.bookings.length > 0 ? (
                    this.state?.books.bookings?.map((schedule: Booking) => {
                    //    localStorage.setItem('book-id', schedule.id)
                        return ( 
                            <Grid  item key={Math.random().toString(36).substr(2, 9)}>
                                <Link to={`/${schedule.Host.firstName}`}  className="link" >

                                <Card onClick={this.handleClick} className="books-container" >
                                    <Grid container direction="row" justify="space-evenly" >
                                        <Typography gutterBottom className="books-header">{`Staying with: ${schedule?.Host.firstName}`}</Typography>
                                        <Typography gutterBottom className="books-header" >{`In: ${schedule?.Host.city}`}, {schedule?.Host.state}</Typography>
                                    </Grid>
                                    <hr />
                                    <CardContent>
                                        <Typography gutterBottom className="books-header">Special notes: </Typography>
                                        <Paper>
                                            <p className="notes">{schedule?.notes}</p>
                                        </Paper>
                                        <Grid container direction="row" justify="space-between">
                                            <Typography className="books-header">{`Peopls staying: ${schedule?.peopleStaying}`}</Typography>

                                            <Typography className="books-header">{`From ${schedule?.startDate} to ${schedule?.endDate}`}</Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                {this.state.open ?
                                   
                                        <Route exact path={`/${schedule.Host.firstName}`}>
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

                                </Link>
                                    </Grid>
                           
                        )

                    })) : <h4>You don't have any stays scheduled!</h4>}
            </Box>
        )
    }

}

export default Books