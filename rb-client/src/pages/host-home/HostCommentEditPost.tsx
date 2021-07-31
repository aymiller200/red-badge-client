import React from "react";
import { TextField, Grid, IconButton, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface HostEditProps {
    hostToken: string | null
    id: number | null
    body: string | null
    hostId: number | null
    commentId: number | null
    initData(): void
    deleteComment(message: number | null): void
}

interface HostEditState {
    editBody: string | null
    updateActive: boolean
}

class HostCommentEditPost extends React.Component<HostEditProps, HostEditState>{

    constructor(props: HostEditProps) {
        super(props)
        this.state = {
            editBody: this.props.body,
            updateActive: false
        }
    }

    editComment = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3535/comment/host-edit/${localStorage.getItem('host-id')}/${this.props.commentId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('host-token')}`
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
                            aria-label='Edit comment'
                            type='text'
                            value={this.state.editBody}
                            onChange={(e) => this.setState({ editBody: e.target.value })}
                        />
                         <Grid container direction='row' justify='flex-end'>
                        <Button type='submit'>
                            <CheckBoxIcon fontSize='small' color='primary' />
                        </Button>
                        </Grid>
                    </form>
                    : <h6 className='body'>{this.props.body}</h6>}

                <Grid className='button-container'>
                    <IconButton onClick={() => this.setState({ updateActive: !this.state.updateActive })} className='edit'>
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

export default HostCommentEditPost