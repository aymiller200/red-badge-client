import './App.scss';
import React from 'react';
import Landing from '../landing/Landing'
import NavBar from '../../components/nav/Navbar';
import GuestHome from '../guest-home/GuestHome'
import HostHome from '../host-home/HostHome'

//import { Route, Link, Switch } from 'react-router-dom'

interface AppProps {
}

interface AppState {
  token: string | null
  bandName: string | null
  guestId: number | null
  guestUser: string | null
  hostToken: string | null
  hostUser: string | null
  hostId: number | null
  hostFirst: string | null
  hostLast: string | null
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)
    this.state = {
      token: null,
      guestUser: null,
      bandName: null,
      guestId: null,
      hostToken: null,
      hostUser: null,
      hostId: null,
      hostFirst: null, 
      hostLast: null,

    }
  }

  setBandName = (band: string) => {
    localStorage.setItem('band', band)
    this.setState({ bandName: band })
  }

  setGuestId = (id: number) => {
    this.setState({ guestId: id })
    localStorage.setItem('id', JSON.stringify(id))
    console.log(this.state.guestId)
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('guest-token', newToken)
    this.setState({ token: newToken })
  }

  setGuestUser = (user: string) => {
    this.setState({ guestUser: user })
    localStorage.setItem('guest-user', user)
  }

  updateHostToken = (hostToken: string) => {
    localStorage.setItem('host-token', hostToken)
    this.setState({ hostToken: hostToken })
  }

  setHostUser = (hUser: string) => {
    this.setState({ hostUser: hUser })
    localStorage.setItem('host-user', hUser)
  }

  setHostId = (id: number) => {
    localStorage.setItem('host-id', JSON.stringify(id))
    this.setState({ hostId: id })
  }

  setHostFirst = (first: string) => {
    this.setState({hostFirst: first})
    localStorage.setItem('host-first', first)
  }

  setHostLast = (last: string) => {
    this.setState({hostLast: last})
    localStorage.setItem('host-last', last)
  }

  guestLogout = () => {
    localStorage.clear()
    this.setState({ guestUser: '', token: '' })
  }

  hostLogout = () => {
    localStorage.clear()
    this.setState({ hostUser: '', hostToken: '' })

  }

  componentWillUnmount(){
    if(!this.state.guestId){
      this.setState({guestId: null})
      this.setState({bandName: null})
      this.setState({token: null})
      this.setState({guestUser: null})
    } else if(!this.state.hostId){
      this.setState({hostId: null})
      this.setState({hostUser: null})
      this.setState({hostToken: null})
      this.setState({hostFirst: null})
      this.setState({hostLast: null})
    }
  }




  protectedViews() {
    if (this.state.token || localStorage.getItem('guest-token')) {  
      return (
        <div>
          <GuestHome
            bandName={this.state.bandName}
            token={this.state.token}
            guestId={this.state.guestId}
          />

        </div>

      )

    } else {
      return (
        <Landing
          token={this.state.token}
          updateToken={this.updateToken}
          hostToken={this.state.hostToken}
          guestId={this.state.guestId}
          hostId={this.state.hostId}
          setHostId={this.setHostId}
          setGuestId={this.setGuestId}
          updateHostToken={this.updateHostToken}
          setGuestUser={this.setGuestUser}
          guestUser={this.state.guestUser}
          setHostUser={this.setHostUser}
          hostUser={this.state.hostUser}
          bandName={this.state.bandName}
          setBandName={this.setBandName}
          hostFirst={this.state.hostFirst}
          hostLast={this.state.hostLast}
          setHostFirst={this.setHostFirst}
          setHostLast={this.setHostLast}
        />
      )
    }
  }

  hostViews() {
    if (this.state.hostToken || localStorage.getItem('host-token')) {
      return (
        <HostHome 
        hostId={this.state.hostId} 
        hostUser={this.state.hostUser}
        hostFirst={this.state.hostFirst}
        hostLast={this.state.hostLast} 
        hostToken={this.state.hostToken} />
      )
    } else {
      return (
        <Landing
          token={this.state.token}
          updateToken={this.updateToken}
          hostToken={this.state.hostToken}
          guestId={this.state.guestId}
          hostId={this.state.hostId}
          setHostId={this.setHostId}
          setGuestId={this.setGuestId}
          updateHostToken={this.updateHostToken}
          setGuestUser={this.setGuestUser}
          guestUser={this.state.guestUser}
          setHostUser={this.setHostUser}
          hostUser={this.state.hostUser}
          bandName={this.state.bandName}
          setBandName={this.setBandName}
          hostFirst={this.state.hostFirst}
          hostLast={this.state.hostLast}
          setHostFirst={this.setHostFirst}
          setHostLast={this.setHostLast}

        />
      )
    }

  }
  render() {

    return (
      <div className="App">
        <NavBar
          token={this.state.token}
          hostToken={this.state.hostToken}
          guestUser={this.state.guestUser}
          hostUser={this.state.hostUser}
          guestId={this.state.guestId}
          hostId={this.state.hostId}
          hostFirst={this.state.hostFirst}
          hostLast={this.state.hostLast}
          setHostFirst={this.setHostFirst}
          setHostLast={this.setHostLast}
          setHostId={this.setHostId}
          setGuestId={this.setGuestId}
          setHostUser={this.setHostUser}
          updateToken={this.updateToken}
          updateHostToken={this.updateHostToken}
          setGuestUser={this.setGuestUser}
          hostLogout={this.hostLogout}
          guestLogout={this.guestLogout}
          bandName={this.state.bandName}
          setBandName={this.setBandName}


        />
        {this.state.token || localStorage.getItem('guest-token') ? this.protectedViews() : this.hostViews()}

      </div>
    );
  }
}

export default App;
