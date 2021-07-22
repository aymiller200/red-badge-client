import './styles/schedule.scss'

import React from "react";
import {Dialog, TextField, Grid, Button} from '@material-ui/core'
import Close from "@material-ui/icons/Close";
import {Link} from 'react-router-dom'

interface ScheduleProps{
    token: string | null
    guestId: number | null
    hostId: number
    hostName: string
    hostLast: string
}

class Schedule extends React.Component<ScheduleProps>{

    state={
        book: {},
            username: '', 
            startDate: '', 
            endDate: '', 
            notes: '',
            peopleStaying: '',
            open: false
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    }

    book = async(e: any) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3535/book/schedule/${localStorage.getItem('id')}`,{
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
        const json = await res.json()
        this.setState({book: json})
        console.log(this.state.book)
        console.log(json)
        this.setState({startDate: '', endDate: '', notes: '', peopleStaying: ''})

    }

    render(){
        return(
        <Dialog open>
            <form onSubmit={this.book}>
            <h4>Booking with: {this.props.hostName} {this.props.hostLast}</h4>
            <Grid container direction="column" >
                <TextField 
                    type="text"
                    required
                    placeholder="Start Date"
                    variant="outlined" 
                    className="schedule"
                    value={this.state.startDate}
                    onChange={(e) => this.setState({startDate: e.target.value})}/>
                 <TextField 
                    type="text"
                    required
                    placeholder="End Date"
                    variant="outlined"
                    className="schedule" 
                    value={this.state.endDate}
                    onChange={(e) => this.setState({endDate: e.target.value})}/>
                    <TextField 
                    type="number"
                    required
                    placeholder="People Staying"
                    variant="outlined"
                    className="schedule"
                    value={this.state.peopleStaying}
                    onChange={(e) => this.setState({peopleStaying: e.target.value})} />
                 <TextField 
                    type="text"
                    required
                    placeholder="Special notes?"
                    variant="outlined"
                    className="schedule" 
                    value={this.state.notes}
                    onChange={(e) => this.setState({notes: e.target.value})}/>
           
          
            <Button type="submit">Submit</Button>
                  </Grid>
            </form>
            <Link to="/hosts">
                <Close onClick={this.handleClick}/>
            </Link>

            </Dialog>
           
        )
    }
}

export default Schedule