import './styles/about.scss'
import React from 'react'
import APIURL from '../../helpers/environment'

import { Grid, TextField, Typography, Box, Link, Button, Input, InputAdornment, Tooltip } from '@material-ui/core'


interface AboutProps {
    token: string | null
    guestId: number | null
    bandName: string | null
}

interface AboutState {
    info: InfoObj | null
    genre: GenreObj | null
    social: SocialObj | null
    editBody: string | null
    editSocial: string | null
    editGenre: string | null
    id: number | null
    socialId: number | null
    genreId: number | null
    updateBody: boolean
    updateGenre: boolean
    updateSocial: boolean
    postBody: string
    socialMedia: string
    musicGenre: string
}

interface Info {
    body: string | null
    id: number | null
}

interface InfoObj {
    info: Info | null
}

interface Genre {
    genre: string | null
    id: number | null
}

interface GenreObj {
    genre: Genre | null
}

interface Social {
    socialMedia: string | null
    id: number | null
}

interface SocialObj {
    social: Social | null
}

class About extends React.Component<AboutProps, AboutState> {

    constructor(props: AboutProps) {
        super(props)
        this.state = {
            info: {
                info: {
                    body: null,
                    id: null,
                }
            },

            genre: {
                genre: {
                    genre: null,
                    id: null
                }
            },

            social: {
                social: {
                    socialMedia: null,
                    id: null
                }
            },
            postBody: '',
            socialMedia: '',
            musicGenre: '',
            editBody: null,
            editSocial: null,
            editGenre: null,
            id: null,
            socialId: null,
            genreId: null,
            updateBody: false,
            updateGenre: false,
            updateSocial: false,

        }
    }

    initData = async () => {
        if (localStorage.getItem('id')) {
            const res = await fetch(`${APIURL}/aboutyou/get-bio/${localStorage.getItem('id')}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ info: json })
            this.setState({ id: json?.info?.id })
            this.setState({ editBody: json?.info?.body })

        } else {
            const res = await fetch(`${APIURL}/aboutyou/get-bio/${this.props.guestId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
            })
            const json = await res.json()
            this.setState({ info: json })
            this.setState({ id: json?.info?.id })
            this.setState({ editBody: json?.info?.body })
        }
    }

    initGenre = async () => {
        if (localStorage.getItem('id')) {
            const res = await fetch(`${APIURL}/genre/get-genre/${localStorage.getItem('id')}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ genre: json })
            this.setState({ genreId: json?.genre?.id })
            this.setState({ editGenre: json?.genre?.genre })

        } else {
            const res = await fetch(`${APIURL}/genre/get-genre/${this.props.guestId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
            })
            const json = await res.json()
            this.setState({ genre: json })
            this.setState({ genreId: json?.genre?.id })
            this.setState({ editGenre: json?.genre?.genre })
        }
    }

    initSocial = async () => {
        if (localStorage.getItem('id')) {
            const res = await fetch(`${APIURL}/social-media/get-social-media/${localStorage.getItem('id')}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
            })
            const json = await res.json()
            this.setState({ social: json })
            this.setState({ socialId: json?.social?.id })
            this.setState({ editSocial: json?.social?.socialMedia })

        } else {
            const res = await fetch(`${APIURL}/social-media/get-social-media/${this.props.guestId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
            })
            const json = await res.json()
            this.setState({ social: json })
            this.setState({ socialId: json?.social?.id })
            this.setState({ editSocial: json?.social?.socialMedia })
        }
    }

    postBio = async (e: any) => {
        e.preventDefault()
        if (this.props.guestId) {
            const res = await fetch(`${APIURL}/aboutyou/guest-info`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
                body: JSON.stringify({
                    body: this.state.postBody,
                    GuestId: this.props.guestId
                })
            })
            await res.json()
            this.initData()
        } else {
            const res = await fetch(`${APIURL}/aboutyou/guest-info`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
                body: JSON.stringify({
                    body: this.state.postBody,
                    GuestId: localStorage.getItem('id')
                })
            })
            await res.json()
            this.initData()

        }
    }

    postGenre = async (e: any) => {
        e.preventDefault()
        if (this.props.guestId) {
            const res = await fetch(`${APIURL}/genre/post`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
                body: JSON.stringify({
                    genre: this.state.musicGenre,
                    GuestId: this.props.guestId
                }),
            })
            await res.json()
            this.initGenre()

        } else {
            const res = await fetch(`${APIURL}/genre/post`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
                body: JSON.stringify({
                    genre: this.state.musicGenre,
                    GuestId: localStorage.getItem('id')
                }),
            })
            await res.json()
            this.initGenre()
        }
    }

    postSocial = async (e: any) => {
        e.preventDefault()
        if (this.props.guestId) {
            const res = await fetch(`${APIURL}/social-media/post`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
                body: JSON.stringify({
                    socialMedia: this.state.socialMedia,
                    GuestId: this.props.guestId
                }),
            })
            await res.json()
            this.initSocial()
        } else {
            const res = await fetch(`${APIURL}/social-media/post`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
                body: JSON.stringify({
                    socialMedia: this.state.socialMedia,
                    GuestId: localStorage.getItem('id')
                }),
            })
            await res.json()
            this.initSocial()
        }
    }

    updateBio = async (e: any) => {
        e.preventDefault()
        if (this.props.guestId) {
            const res = await fetch(`${APIURL}/aboutyou/edit-bio/${this.props.guestId}/${this.state.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
                body: JSON.stringify({
                    body: this.state.editBody
                })
            })
            await res.json()
            this.initData()
            this.setState({ updateBody: false })
        } else {
            const res = await fetch(`${APIURL}/aboutyou/edit-bio/${localStorage.getItem('id')}/${this.state.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
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

    updateMusic = async (e: any) => {
        e.preventDefault()
        if (this.props.guestId) {
            const res = await fetch(`${APIURL}/genre/edit/${this.props.guestId}/${this.state.genreId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
                body: JSON.stringify({
                    genre: this.state.editGenre
                })
            })
            await res.json()
            this.initGenre()
            this.setState({ updateGenre: false })
        } else {
            const res = await fetch(`${APIURL}/genre/edit/${localStorage.getItem('id')}/${this.state.genreId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
                body: JSON.stringify({
                    genre: this.state.editGenre
                })
            })
            await res.json()
            this.initGenre()
            this.setState({ updateGenre: false })
        }
    }

    updateMedia = async (e: any) => {
        e.preventDefault()
        if (this.props.guestId) {
            const res = await fetch(`${APIURL}/social-media/edit/${this.props.guestId}/${this.state.socialId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.props.token}`
                }),
                body: JSON.stringify({
                    socialMedia: this.state.editSocial
                })
            })
            await res.json()
            this.initSocial()
            this.setState({ updateSocial: false })
        } else {
            const res = await fetch(`${APIURL}/social-media/edit/${localStorage.getItem('id')}/${this.state.socialId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('guest-token')}`
                }),
                body: JSON.stringify({
                    socialMedia: this.state.editSocial
                })
            })
            await res.json()
            this.initSocial()
            this.setState({ updateSocial: false })
        }
    }

    async componentDidMount() {

        try {
            await this.initGenre()
        } catch (e: any) {
            console.error(e)
        }
        try {
            await this.initGenre()
        } catch (e: any) {
            console.error(e)
        }
        try {
            await this.initData()
        } catch (e: any) {
            console.error(e)
        }
        try {
            await this.initSocial()
        } catch (e: any) {
            console.error(e)
        }

    }

    componentWillUnmount() {
        if (!localStorage.getItem('id')) {
            this.setState({ info: null })
            this.setState({ genre: null })
            this.setState({ social: null })
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

                <Box className="bio" key={this.props.guestId}>
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
                                    className='bio-input'
                                    value={this.state.editBody}
                                    onChange={(e) => this.setState({ editBody: e.target.value })}
                                    endAdornment={<InputAdornment position='end'>
                                        <Button color='primary' type='submit'>Submit</Button>
                                    </InputAdornment>}
                                />
                            </form> :
                            <form onSubmit={this.postBio}>
                                <Input
                                    type='text'
                                    placeholder='Tell us about yourself!'
                                    className='bio-input'
                                    aria-label='Post Bio'
                                    multiline
                                    rowsMax={5}
                                    value={this.state.postBody}
                                    onChange={(e) => this.setState({ postBody: e.target.value })}
                                    endAdornment={<InputAdornment position='end'>
                                        <Button color='primary' type='submit'>Submit</Button>
                                    </InputAdornment>}
                                />
                            </form>}
                </Box>

                {this.state?.genre?.genre ?
                    <Tooltip title='Click to edit' placement='bottom-start'>
                        <h4 onClick={() => this.setState({ updateGenre: !this.state.updateGenre })} className='bio-title'>Genre:</h4>
                    </Tooltip>
                    :
                    <h4 className='bio-title-none'>Genre:</h4>}
                <Box className='genre' >
                    {this.state?.genre?.genre && !this.state.updateGenre ?
                        <Typography className='genre-text'>{this.state.genre.genre.genre}</Typography> :
                        this.state.updateGenre ?
                            <form onSubmit={this.updateMusic}>
                                <TextField
                                    type='text'
                                    fullWidth
                                    aria-label='Update Genre'
                                    className='genre-input'
                                    value={this.state.editGenre}
                                    onChange={(e) => this.setState({ editGenre: e.target.value })}
                                />
                            </form>
                            : <form onSubmit={this.postGenre}>
                                <TextField
                                    type='text'
                                    fullWidth
                                    aria-label='Post Genre'
                                    className='genre-input'
                                    placeholder="What's your genre?"
                                    value={this.state.musicGenre}
                                    onChange={(e) => this.setState({ musicGenre: e.target.value })}
                                />
                            </form>}
                </Box>

                {this.state?.social?.social ?
                    <Tooltip title='Click to edit' placement='bottom-start'>
                        <h4 onClick={() => this.setState({ updateSocial: !this.state.updateSocial })} className='bio-title'>Social Media:</h4>
                    </Tooltip>
                    : <h4 className='bio-title-none'>Social Media:</h4>}
                <Box className='social-media'>
                    {this.state?.social?.social && !this.state.updateSocial ?
                        <Link className='social-text' target='_blank' href={`${this.state.social.social.socialMedia}`} >{this.state.social.social.socialMedia}</Link> :
                        this.state.updateSocial ?

                            <form onSubmit={this.updateMedia}>
                                <TextField
                                    type='url'
                                    fullWidth
                                    className='social-input'
                                    aria-label='Update link'
                                    placeholder='Show us your music!'
                                    value={this.state.editSocial}
                                    onChange={(e) => this.setState({ editSocial: e.target.value })}
                                />
                            </form>

                            : <form onSubmit={this.postSocial}>
                                <TextField
                                    type='url'
                                    fullWidth
                                    className='social-input'
                                    aria-label='Post link'
                                    placeholder='Show us your music!'
                                    value={this.state.socialMedia}
                                    onChange={(e) => this.setState({ socialMedia: e.target.value })}
                                />
                            </form>}
                </Box>

            </Grid>
        )
    }
}

export default About