import React from "react";
import { Card, Grid, CardContent, Typography, Paper } from '@material-ui/core'
import {Route, Link} from 'react-router-dom'
import HostDetails from './HostDetails'

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
    id: number | null
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
            url: `http://localhost:3535/book/host-schedule/${this.props.hostId}`,
            open: false
        }
    }
    

    initData = async () => {
        if (this.props.hostToken && this.props.hostId) {
            const res = await fetch(this.state.url, {
                method: 'GET',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.hostToken}`
                })
            })
            const json = await res.json()
            this.setState({ books: json })
            console.log(this.state.books)
        } else {
            const res = await fetch(`http://localhost:3535/book/host-schedule/${localStorage.getItem('host-id')}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('host-token')}`
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
                {this.state.books?.bookings?.map((schedule) => {
                    return (
                        <Grid container spacing={3} xs={12} md={3} lg={3} key={Math.random().toString(36).substr(2, 9)} >
                             <Link to={`/${schedule.Guest.firstName}`}  className="link" >

                            <Card className="books-container" onClick={this.handleClick}>
                                <Grid container direction="row" justify="space-evenly" >
                                    <Typography gutterBottom className="books-header">{`Guest: ${schedule?.Guest.firstName}`}</Typography>
                                    <Typography className="books-header">{`Band: ${schedule?.Guest.bandName}`}</Typography>
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
                                   
                                   <Route exact path={`/${schedule.Guest.firstName}`}>
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
                            </Link>
                        </Grid>
                    )
                })}

            </div>
        )
    }
}

export default HostBooks