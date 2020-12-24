import React, {Component, useState} from 'react';

import './App.css';

import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login/Login.css";
import Login from "./Login/Login";





class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            is_connected: false,
        }

    }
    connexion = () => {
        this.setState({is_connected: !this.state.is_connected});
    }

    /*<header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>*/
        render() {

                return (
                    <div className="App"><Login connexion={this.connexion.bind(this)}/>
                    </div>
                );

        }
}

export default App;
