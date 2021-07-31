import './styles/aboutHost.scss'

import React from 'react'
import APIURL from '../../helpers/environment'
import { Grid, Typography, Box, Button, Input, InputAdornment, Tooltip } from '@material-ui/core'

interface AboutHostProps {
    hostId: number | null
    hostToken: string | null
}

interface AboutHostState {
    info: InfoObj | null
    id: number | null
    updateBody: boolean
    postBody: string | null
    editBody: string | null
}

interface Info {
    body: string | null
    id: number | null
}

interface InfoObj {
    info: Info | null
}

class AboutHost extends React.Component<AboutHostProps, AboutHostState>{

    constructor(props: AboutHostProps) {
        super(props)
        this.state = {
            info: {
                info: {
                    body: null,
                    id: null
                }
            },
            updateBody: false,
            editBody: null,
            postBody: null,
            id: null
        }
    }

    initData = async () => {
        if (this.props.hostId) {
            const res = await fetch(`${APIURL}/abouthost/host-info/${this.props.hostId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.hostToken}`
                })
            })
            const json = await res.json()
            this.setState({ info: json })
            this.setState({ info: json })
            this.setState({ id: json?.info?.id })
            this.setState({ editBody: json?.info?.body })
        } else {
            const res = await fetch(`${APIURL}/abouthost/host-info/${localStorage.getItem('host-id')}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('host-token')}`
                })
            })
            const json = await res.json()
            this.setState({ info: json })
            this.setState({ info: json })
            this.setState({ id: json?.info?.id })
            this.setState({ editBody: json?.info?.body })
        }
    }

    postBio = async (e: any) => {
        e.preventDefault()
        if (this.props.hostId) {
            const res = await fetch(`http://localhost:3535/abouthost/host-info`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.hostToken}`
                }),
                body: JSON.stringify({
                    body: this.state.postBody,
                    HostId: this.props.hostId
                })
            })
            await res.json()
            this.initData()
        } else {
            const res = await fetch(`http://localhost:3535/abouthost/host-info`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('host-token')}`
                }),
                body: JSON.stringify({
                    body: this.state.postBody,
                    HostId: localStorage.getItem('host-id')
                })
            })
            await res.json()
            this.initData()
        }
    }

    updateBio = async (e: any) => {
        e.preventDefault()
        if (this.props.hostId) {
            const res = await fetch(`${APIURL}/abouthost/edit-bio/${this.props.hostId}/${this.state.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.hostToken}`
                }),
                body: JSON.stringify({
                    body: this.state.editBody
                })
            })
            await res.json()
            this.initData()
            this.setState({ updateBody: false })

        } else {
            const res = await fetch(`${APIURL}/abouthost/edit-bio/${localStorage.getItem('host-id')}/${this.state.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('host-token')}`
                }),
                body: JSON.stringify({
                    body: this.state.editBody
                })
            })
            await res.json()
            this.initData()
            this.setState({ updateBody: false })
        }
    }

    async componentDidMount() {
        try {
            await this.initData()
        } catch (e: any) {
            console.error(e)
        }
        try {
            await this.initData()
        } catch (e: any) {
            console.error(e)
        }
    }

    render() {
        return (
            <Grid container direction='column' justify='flex-start' className='about-section'>
                {this.state?.info?.info ?
                    <Tooltip title='Click to edit' placement='bottom-start'>
                        <h4 onClick={() => this.setState({ updateBody: !this.state.updateBody })} className='bio-title'>Bio:</h4>
                    </Tooltip>
                    : <h4 className='bio-title-none'>Bio:</h4>}

                <Box className='about-host' key={this.props.hostId}>
                    {this.state?.info?.info && !this.state.updateBody ?
                        <Typography align='left' className='bio-text'>{this.state.info.info.body}</Typography>
                        :
                        this.state.updateBody ?
                            <form onSubmit={this.updateBio}>
                                <Input
                                    type='text'
                                    fullWidth
                                    inputProps={{ maxLength: 500 }}
                                    multiline
                                    aria-label='Update Bio'
                                    rowsMax={5}
                                    className='host-input'
                                    value={this.state.editBody}
                                    onChange={(e) => this.setState({ editBody: e.target.value })}
                                    endAdornment={<InputAdornment position='end'>
                                        <Button
                                            color='primary' type='submit'>Submit</Button>
                                    </InputAdornment>}
                                />
                            </form> :
                            <form onSubmit={this.postBio}>
                                <Input
                                    type='text'
                                    placeholder='Tell us about yourself!'
                                    className='host-input'
                                    multiline
                                    aria-label='Post Bio'
                                    rowsMax={5}
                                    value={this.state.postBody}
                                    onChange={(e) => this.setState({ postBody: e.target.value })}
                                    endAdornment={<InputAdornment position='end'>
                                        <Button color='primary' type='submit'>Submit</Button>
                                    </InputAdornment>}
                                />
                            </form>}
                </Box>
            </Grid>
        )
    }
}

export default AboutHost