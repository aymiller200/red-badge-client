import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from '../landing/Landing'
import NavBar from '../../components/nav/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Landing />
      </div>
    );
  }
}

export default App;
