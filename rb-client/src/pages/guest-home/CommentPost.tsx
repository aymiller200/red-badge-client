import React from "react";
import { TextField, Grid, DialogActions, IconButton } from '@material-ui/core'
import APIURL from "../../helpers/environment";
import SendIcon from '@material-ui/icons/Send';

interface PostProps {
    token: string | null
    GuestId: number | null
    HostId: number | null
    BookId: number
    id: number | null
    guestId: number | null
    initData(): void
}

interface PostState{
    body: string 
    username: string
    url: RequestInfo
}

class CommentPost extends React.Component<PostProps, PostState>{
    constructor(props: PostProps){
        super(props)
        this.state = {
            body: '',
            username: '',
            url: `${APIURL}/comment/message`
        }
    }

    submit = async (e: any) => {
        e.preventDefault()
        const res = await fetch(this.state.url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            }),
            body: JSON.stringify({
                body: this.state.body,
                username: localStorage.getItem('guest-user'),
                GuestId: this.props.GuestId,
                HostId: this.props.HostId,
                BookId: this.props.id
            })
        })
        await res.json()
        this.setState({ body: '', username: '' })
        this.props.initData()
    }

    render() {
        return (
            <div className='post'>
                <form onSubmit={this.submit}>
                    <Grid container justify='space-between'>
                        <p className='comment-text'>Leave a Comment:</p>
                        <DialogActions>
                            <IconButton type='submit'>
                                <SendIcon />
                            </IconButton>
                        </DialogActions>
                    </Grid>
                    <TextField
                        type='text'
                        variant='outlined'
                        className='form'
                        rowsMax={8}
                        multiline
                        aria-label='post comment'
                        value={this.state.body}
                        onChange={(e) => this.setState({ body: e.target.value })} />
                </form>
            </div>
        )
    }
}

export default CommentPost