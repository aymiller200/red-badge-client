import React from "react";
import { TextField, Grid, DialogActions, IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

interface PostProps {
    hostToken: string | null
    GuestId: number | null
    HostId: number | null
    BookId: number
    id: number | null
    hostId: number | null
    initData(): void
}

class HostCommentPost extends React.Component<PostProps>{

    state = {
        comment: {},
        body: '',
        username: '',
        url: 'http://localhost:3535/comment/host-message'
    }

    submit = async (e: any) => {
        e.preventDefault()
        const res = await fetch(this.state.url, {
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
        const json = await res.json()
        this.setState({ comment: json })
        console.log(this.state.comment)
        console.log(json)
        this.setState({ body: '', username: '' })
        this.props.initData()
    }


    render() {
        return (
            <div className="post">
                <form onSubmit={this.submit}>
                    <Grid container justify="space-between">
                        <p className="comment-text">Leave a Comment:</p>
                        <DialogActions>
                            <IconButton onClick={this.submit}>
                                <SendIcon />
                            </IconButton>
                        </DialogActions>
                    </Grid>
                    <TextField
                        type="text"
                        variant="outlined"
                        className="form"
                        value={this.state.body}
                        onChange={(e) => this.setState({ body: e.target.value })} />

                </form>
            </div>
        )
    }

}

export default HostCommentPost