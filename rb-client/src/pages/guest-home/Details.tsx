import './styles/details.scss'

import { Dialog, Grid, Typography, Card, CardContent, Paper, IconButton, Box, TextField, Button, Popper, DialogActions } from "@material-ui/core";
import { Link } from 'react-router-dom'
import CommentPost from './CommentPost';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import React from "react";



interface DetailProps {
    token: string | null
    guestId: number | null
    firstName: string
    BookId: number
    city: string
    state: string
    peopleStaying: string
    notes: string
    startDate: string
    endDate: string
    id: number | null
    HostId: number | null
    GuestId: number | null
    username: string

}
interface CommentState {
    comment: CommentObj
    url: RequestInfo
    urlLocal: RequestInfo
    open: boolean
    updateActive: boolean
    updateBody: string
    //body: string
    updateComment: object
    token?: string | null
    guestId?: number | null
    commentId: number | null
    firstName?: string
    city?: string
    state?: string
    peopleStaying?: string
    notes?: string
    startDate?: string
    endDate?: string
    id?: number
    HostId?: number | null
    GuestId?: number | null
    BookId?: number | null
    username?: string
}

interface CommentObj {
    comments: CommentArr[]
}

interface CommentArr {
    body: string
    username: string
    id: number
    BookId: number
    GuestId: number | null
    HostId: number | null
}

class Details extends React.Component<DetailProps, CommentState>{

    constructor(props: DetailProps) {
        super(props)
        this.state = {
            comment: {
                comments: []
            },
            updateComment: {},
            updateBody: '',
            updateActive: false,
            open: false,
            commentId: null,
            url: `http://localhost:3535/comment/all/${this.props.guestId}`,
            urlLocal: `http://localhost:3535/comment/all/${localStorage.getItem('id')}`
        }
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
            this.setState({ comment: json })

        } else {
            const res = await fetch(this.state.urlLocal, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('guest-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ comment: json })
        }
    }

    editComment = async (message: any) => {
        const res = await fetch(`http://localhost:3535/comment/edit/${message.id}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('guest-token')}`
            }),
            body: JSON.stringify({
                body: this.state.updateBody,
                username: localStorage.getItem('guest-user'),
                GuestId: this.props.GuestId,
                HostId: this.props.HostId,
                BookId: this.props.BookId
            })
        })
        await res.json()
        this.initData()
        this.setState({ updateActive: false, updateBody: '' })
    
    }

    deleteComment = async (message: any) => {
        const res = await fetch(`http://localhost:3535/comment/delete/${localStorage.getItem('id')}/${message.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('guest-token')}`
            })
        })
        await res.json()
        this.initData()

    }

    displayUpdate = () => {
        return(
            <TextField
                autoFocus
                required
                variant="outlined"
                type="text"
                //defaultValue={message.body}
                value={this.state.updateBody}
                onChange={(e) => this.setState({ updateBody: e.target.value })}
                />
        )
    }


    handleClick = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount = () => {
        this.initData()
    }

    display = () => {

        return (
            <Box className="comments-container" >
                {this.state.comment?.comments?.length > 0 ? (
                    this.state.comment?.comments?.map((message) => {

                        return (
                            <Paper className="all-comments" key={Math.random().toString(36).substr(2, 9)}>
                                {message.BookId === this.props.id ?
                                    <div>
                                        {message.username === localStorage.getItem('guest-user') ?
                                            <Grid className="comments" container alignContent="flex-end" justify="flex-end">

                                                {this.state.updateActive ?
                                                    <Dialog open>
                                                        <IconButton onClick={() => this.setState({ updateActive: false })}>
                                                            <CancelIcon />
                                                        </IconButton>
                                                            {this.displayUpdate()}
                                                                <DialogActions>
                                                            <Button onClick={() => this.editComment(message)}>Done</Button>
                                                        </DialogActions>

                                                    </Dialog>
                                                    : null}

                                                <h6 className="body">{message.body}</h6>
                                                <Grid className="button-container">
                                                    <IconButton onClick={() => this.setState({ updateActive: true })} className="edit">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={() => this.deleteComment(message)} className="delete">
                                                        <CancelIcon fontSize="small" />
                                                    </IconButton>
                                                </Grid>


                                            </Grid>

                                            : <Grid container alignContent="flex-start" justify="flex-start" className="reply-body">
                                                <h6>{message.body}</h6>
                                            </Grid>
                                        }
                                    </div>
                                    : null}
                            </Paper>
                        )
                    })) : null}

            </Box>)
    }

    render() {
        return (
            <Dialog open className="details">
                <Card className="details-container">
                    <CardContent className="card-content">
                        <Grid container alignContent="center" justify="space-around">
                            <Typography gutterBottom className="books-header">{`Staying with: ${this.props.firstName}`}</Typography>
                            <Typography gutterBottom className="books-header" >{`In: ${this.props.city}`}, {this.props.state}</Typography>
                        </Grid>
                        <Typography gutterBottom className="books-header special-notes">Special notes: </Typography>
                        <Paper className="notes">
                            <p>{this.props.notes}</p>
                        </Paper>
                        <Grid container direction="row" justify="space-between" className="dates-people">
                            <Typography className="books-header">{`People staying: ${this.props.peopleStaying}`}</Typography>
                            <Typography className="books-header">{`From ${this.props.startDate} to ${this.props.endDate}`}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
                {this.display()}
                <CommentPost
                    token={this.props.token}
                    GuestId={this.props.GuestId}
                    HostId={this.props.HostId}
                    BookId={this.props.BookId}
                    id={this.props.id}
                    initData={this.initData}
                    guestId={this.props.guestId}
                />
                <Link to="/" onClick={this.handleClick} className="close">Close</Link>

            </Dialog>
        )
    }
}

export default Details