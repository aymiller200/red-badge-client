import React from "react";
import HostCommentEditPost from './HostCommentEditPost';
import APIURL from "../../helpers/environment";
import { Dialog, Grid, Typography, Card, CardContent, Paper, IconButton, Box, TextField, DialogActions } from "@material-ui/core";
import { Link } from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send'

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
    editBody: string | null
    body: string | null
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

            updateActive: false,
            open: false,
            commentId: null,
            editBody: null,
            body: null,
            url: `${APIURL}/comment/host-all/${this.props.hostId}`,
            urlLocal: `${APIURL}/comment/host-all/${localStorage.getItem('host-id')}`
        }
    }

    initData = async () => {

        if (this.props.hostToken && this.props.hostId) {
            const res = await fetch(this.state.url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.hostToken}`
                }),
            })
            const json = await res.json()
            this.setState({ comment: json })

        } else {
            const res = await fetch(this.state.urlLocal, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('host-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ comment: json })
        }
    }

    deleteComment = async (message: number | null) => {
        const res = await fetch(`${APIURL}/comment/host-delete/${localStorage.getItem('host-id')}/${message}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('host-token')}`
            })
        })
        await res.json()
        this.initData()
    }

    commentPost = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`${APIURL}/comment/host-message`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('host-token')}`
            }),
            body: JSON.stringify({
                body: this.state.body,
                username: localStorage.getItem('host-user'),
                GuestId: this.props.GuestId,
                HostId: this.props.HostId,
                BookId: this.props.id
            })
        })
        await res.json()
        this.setState({ body: '', username: '' })
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
    
    commentPostDisplay = () => {
        return (
            <div className='post'>
                <form onSubmit={this.commentPost}>
                    <Grid container justify='space-between'>
                        <p className='comment-text'>Leave a Comment:</p>
                        <DialogActions>
                            <IconButton onClick={this.commentPost}>
                                <SendIcon />
                            </IconButton>
                        </DialogActions>
                    </Grid>
                    <TextField
                        type='text'
                        variant='outlined'
                        aria-label='Post comment'
                        rowsMax={8}
                        multiline
                        className='form'
                        value={this.state.body}
                        onChange={(e) => this.setState({ body: e.target.value })} />
                </form>
            </div>
        )
    }

    display = () => {
        return (
            <Box className='comments-container' >
                {this.state.comment?.comments?.length > 0 ? (
                    this.state.comment?.comments?.map((message) => {

                        return (
                            <Paper className='all-comments' key={Math.random().toString(36).substr(2, 9)}>
                                {message.BookId === this.props.id ?
                                    <div>
                                        {message.username === localStorage.getItem('host-user') ?
                                            <Grid className='comments' container alignContent='flex-end' justify='flex-end'>

                                                    <HostCommentEditPost
                                                        hostToken={this.props.hostToken}
                                                        hostId={this.props.hostId}
                                                        id={this.props.id}
                                                        commentId={message.id}
                                                        initData={this.initData}
                                                        body={message.body}
                                                        deleteComment={this.deleteComment}
                                                       
                                                    />
                                            </Grid>

                                            : <Grid container alignContent='flex-start' justify='flex-start' className='reply-body'>
                                                <h5>{message.body}</h5>
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
            <Dialog open className='details'>
                <Card className='details-container'>
                    <CardContent className='card-content'>
                        <Grid container alignContent='center' justify='space-around'>
                            <Typography gutterBottom className='books-header'>{`Guest: ${this.props.firstName}`}</Typography>
                            <Typography gutterBottom className='books-header' >{`Band: ${this.props.bandName}`}</Typography>
                        </Grid>
                        <Typography gutterBottom className='books-header special-notes'>Special notes: </Typography>
                        <Paper className='notes'>
                            <p>{this.props.notes}</p>
                        </Paper>
                        <Grid container direction='row' justify='space-between' className='dates-people'>
                            <Typography className='books-header'>{`People staying: ${this.props.peopleStaying}`}</Typography>
                            <Typography className='books-header'>{`From ${this.props.startDate} to ${this.props.endDate}`}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
                {this.display()}
                {this.commentPostDisplay()}
                <Link to="/" onClick={this.handleClick} className='close'>Close</Link>
            </Dialog>
        )
    }
}

export default HostDetails