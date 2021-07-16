import React from "react";
import { Card, Grid, CardContent, Typography, Paper } from '@material-ui/core'

interface hostBooksProps {
    hostId: number | null,
    hostToken: string | null
}

class HostBooks extends React.Component<hostBooksProps>{

    state = {
        books: {
            bookings: [
                {
                    Guest: {
                        bandName: '',
                        firstName: '',
                    },

                    peopleStaying: '',
                    notes: '',
                    startDate: '',
                    endDate: ''
                }
            ]
        },
        url: `http://localhost:3535/book/host-schedule/${this.props.hostId}`
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

    componentDidMount = () => {
        this.initData()
    }

    render() {
        return (
            <div>
                {this.state.books?.bookings?.map((schedule) => {
                    return (
                        <Grid item spacing={3} xs={12} md={3} lg={3}>
                            <Card className="books-container" >
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
                        </Grid>
                    )
                })}

            </div>
        )
    }
}

export default HostBooks