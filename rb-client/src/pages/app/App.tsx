import './App.scss';
import React from 'react';

import Landing from '../landing/Landing'
import NavBar from '../../components/nav/Navbar';
import GuestHome from '../guest-home/GuestHome'
import HostHome from '../host-home/HostHome'



interface AppProps {
}
interface AppState {
  token: string | null,
  hostToken: string | null
  guestUser: string | null
  hostUser: string | null
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)
    this.state = {
      token: null,
      hostToken: null,
      guestUser: null, 
      hostUser: null,
    }
  }

  updateToken = (newToken: string) => {
    console.log(newToken)
    this.setState({ token: newToken })
  }

  updateHostToken = (hostToken: string) => {
    console.log(hostToken)
    this.setState({ hostToken: hostToken })
  }

  setGuestUser = (user: string) => {
    console.log(user)
    this.setState({guestUser: user})
    localStorage.setItem('guest-user', user)
  }

  setHostUser = (hUser:string) => {
    console.log(hUser)
    this.setState({hostUser: hUser})
    localStorage.setItem('host-user', hUser)
  }

  protectedViews() {
    if (this.state.token || localStorage.getItem('guest-user')) { // will be false if token is not string, because NULL is FALSY, coerces in checks to false. same as undefined, both are falsy/false-ish. 
      return (
        <GuestHome />
      )

    } else {
      return (
        <Landing
          token={this.state.token}
          updateToken={this.updateToken}
          hostToken={this.state.hostToken}
          updateHostToken={this.updateHostToken}
          setGuestUser={this.setGuestUser}
          guestUser={this.state.guestUser}
          setHostUser={this.setHostUser}
          hostUser={this.state.hostUser}
        />
      )
    }
  }

  hostViews() {
    if (this.state.hostToken || localStorage.getItem('host-user') ) {
      return (
        <HostHome />
      )
    } else {
      return (
        <Landing
          token={this.state.token}
          updateToken={this.updateToken}
          hostToken={this.state.hostToken}
          updateHostToken={this.updateHostToken}
          setGuestUser={this.setGuestUser}
          guestUser={this.state.guestUser}
          setHostUser={this.setHostUser}
          hostUser={this.state.hostUser}

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
          setHostUser={this.setHostUser}
          updateToken={this.updateToken}
          updateHostToken={this.updateHostToken}
          setGuestUser={this.setGuestUser}

        />
        {this.state.token || localStorage.getItem('guest-user') ? this.protectedViews() : this.hostViews()}

      </div>
    );
  }
}

export default App;
