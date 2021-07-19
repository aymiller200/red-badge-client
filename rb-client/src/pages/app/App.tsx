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
  hostToken: string | null
  hostId: number | null
  guestUser: string | null
  hostUser: string | null
  bandName: string | null
  guestId: number | null
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)
    this.state = {
      token: null,
      hostToken: null,
      guestUser: null,
      hostUser: null,
      bandName: null,
      guestId: null,
      hostId: null
    }
  }

  setBandName = (band: string) => {
    localStorage.setItem('band', band)
    this.setState({ bandName: band })
  }

  setGuestId = (id: number) => {
    console.log(id)
    localStorage.setItem('id', JSON.stringify(id))
    this.setState({ guestId: id })
  }

  updateToken = (newToken: string) => {
    console.log(newToken)
    localStorage.setItem('guest-token', newToken)
    this.setState({ token: newToken })
  }

  setGuestUser = (user: string) => {
    console.log(user)
    this.setState({ guestUser: user })
    localStorage.setItem('guest-user', user)
  }

  updateHostToken = (hostToken: string) => {
    console.log(hostToken)
    localStorage.setItem('host-token', hostToken)
    this.setState({ hostToken: hostToken })
  }

  setHostUser = (hUser: string) => {
    console.log(hUser)
    this.setState({ hostUser: hUser })
    localStorage.setItem('host-user', hUser)
  }

  setHostId = (id: number) => {
    console.log(id)
    localStorage.setItem('host-id', JSON.stringify(id))
    this.setState({ hostId: id })
  }

  guestLogout = () => {
    localStorage.clear()
    this.setState({ guestUser: '', token: '' })
  }

  hostLogout = () => {
    localStorage.clear()
    this.setState({ hostUser: '', hostToken: '' })

  }




  protectedViews() {
    if (this.state.token || localStorage.getItem('guest-token')) { // will be false if token is not string, because NULL is FALSY, coerces in checks to false. same as undefined, both are falsy/false-ish. 
      return (
    
          <GuestHome
            bandName={this.state.bandName}
            token={this.state.token}
            guestId={this.state.guestId}
          />
        
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
        />
      )
    }
  }

  hostViews() {
    if (this.state.hostToken || localStorage.getItem('host-token')) {
      return (
        <HostHome hostId={this.state.hostId} hostUser={this.state.hostUser} hostToken={this.state.hostToken} />
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
          // hostId={this.state.hostId}
          // setHostId={this.setHostId}
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
