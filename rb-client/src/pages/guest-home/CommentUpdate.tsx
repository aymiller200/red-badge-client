import React from 'react'
import { Grid, TextField, IconButton, Button } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface CommentUpdateProps {
    token: string | null
    guestId: number | null
    commentBody: string
    commentId: number
    initData(): void
    deleteComment(message: number | null): void
}

interface CommentUpdateState {
    editBody: string | null
    updateActive: boolean
}

class CommentUpdate extends React.Component<CommentUpdateProps, CommentUpdateState>{

    constructor(props: CommentUpdateProps) {
        super(props)
        this.state = {
            editBody: this.props.commentBody,
            updateActive: false
        }
    }

    editComment = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3535/comment/edit/${localStorage.getItem('id')}/${this.props.commentId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('guest-token')}`
            }),
            body: JSON.stringify({
                body: this.state.editBody,
            })
        })
        await res.json()
        this.props.initData()
        this.setState({ updateActive: false })
    }

    render() {
        return (
            <Grid container direction='row' justify='flex-end'>
                {this.state.updateActive ?
                    <form onSubmit={this.editComment}>
                        <TextField
                            fullWidth
                            required
                            rowsMax={8}
                            multiline
                            type="text"
                            value={this.state.editBody}
                            onChange={(e) => this.setState({ editBody: e.target.value })}
                        />
                        <Grid container direction='row' justify='flex-end'>
                        <Button type='submit'>
                            <CheckBoxIcon fontSize='small' color='primary' />
                        </Button>
                        </Grid>
                    </form>
                    : <h6 className='body'>{this.props.commentBody}</h6>}
                <Grid className='button-container'>
                    <IconButton onClick={() => this.setState({ updateActive: !this.state.updateActive })} className="edit">
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton onClick={() => this.props.deleteComment(this.props.commentId)} className='delete'>
                        <CancelIcon fontSize='small' />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}

export default CommentUpdate