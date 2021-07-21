import { Dialog, Grid, Typography, Card, CardContent, Paper, IconButton, Box, TextField, Button, Popper, DialogActions } from "@material-ui/core";
import { Link } from 'react-router-dom'
import HostCommentPost from './HostCommentPost';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import React from "react";



interface DetailProps {
    hostId: number | null
    hostToken: string | null
    hostUser: string | null
    firstName: string
    bandName: string
    peopleStaying: string
    notes: string
    startDate: string
    endDate: string
    id: number | null
    HostId: number | null
    GuestId: number | null
    BookId: number
    username: string

}
interface CommentState {
    comment: CommentObj
    url: RequestInfo
    urlLocal: RequestInfo
    open: boolean
    updateActive: boolean
    updateBody: string
    updateComment: object
    commentId: number | null
    firstName?: string
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

class HostDetails extends React.Component<DetailProps, CommentState>{

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
            url: `http://localhost:3535/comment/host-all/${this.props.hostId}`,
            urlLocal: `http://localhost:3535/comment/host-all/${localStorage.getItem('host-id')}`
        }
    }

    initData = async () => {

        if (this.props.hostToken && this.props.hostId) {
            const res = await fetch(this.state.url, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${this.props.hostToken}`
                }),
            })
            const json = await res.json()
            this.setState({ comment: json })

        } else {
            const res = await fetch(this.state.urlLocal, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('host-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ comment: json })
        }
    }


    editComment = async (message: any) => {
        const res = await fetch(`http://localhost:3535/comment/host-edit/${message.id}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('host-token')}`
            }),
            body: JSON.stringify({
                body: this.state.updateBody,
                username: localStorage.getItem('host-user'),
                GuestId: this.props.GuestId,
                HostId: this.props.HostId,
                BookId: this.props.BookId
            })
        })
        await res.json()
        this.initData()
        this.setState({ updateActive: false })
    }

    deleteComment = async (message: any) => {
        const res = await fetch(`http://localhost:3535/comment/host-delete/${localStorage.getItem('host-id')}/${message.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('host-token')}`
            })
        })
        await res.json()
        this.initData()

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
        console.log(this.props.hostUser)
        return (
            <Box className="comments-container" >
                {this.state.comment?.comments?.length > 0 ? (
                    this.state.comment?.comments?.map((message) => {

                        return (
                            <Paper className="all-comments" key={Math.random().toString(36).substr(2, 9)}>
                                {message.BookId === this.props.id ?
                                    <div>
                                        {message.username === localStorage.getItem('host-user') ?
                                            <Grid className="comments" container alignContent="flex-end" justify="flex-end">

                                                {this.state.updateActive ?
                                                    <Dialog open>
                                                        <IconButton onClick={() => this.setState({ updateActive: false })}>
                                                            <CancelIcon />
                                                        </IconButton>
                                                        <DialogActions>
                                                            <TextField
                                                                autoFocus
                                                                required
                                                                type="text"
                                                                value={this.state.updateBody}
                                                                onChange={(e) => this.setState({ updateBody: e.target.value })}
                                                            />
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
                            <Typography gutterBottom className="books-header">{`Guest: ${this.props.firstName}`}</Typography>
                            <Typography gutterBottom className="books-header" >{`Band: ${this.props.bandName}`}</Typography>
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
                <HostCommentPost
                    hostToken={this.props.hostToken}
                    hostId={this.props.hostId}
                    GuestId={this.props.GuestId}
                    BookId={this.props.BookId}
                    HostId={this.props.HostId}
                    id={this.props.id}
                    initData={this.initData}
                />
                <Link to="/" onClick={this.handleClick} className="close">Close</Link>

            </Dialog>
        )
    }
}

export default HostDetails