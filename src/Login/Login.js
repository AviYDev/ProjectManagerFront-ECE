import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import "./Login.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "../Home/Home";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import '../bootstrap/dist/css/bootstrap.min.css';
import AWSlogo from '../Ressources/awslogo.png';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignin: true,
            is_connected: false,
        }
    }



    hello = () => {
        this.setState({isSignin: !this.state.isSignin});
        // connexion={this.connexion.bind(this)}
    }
    connexion = () => {
        this.setState({is_connected: !this.state.is_connected});
    }

    render() {
        if (this.state.is_connected) {
                   return( <Home disconnexion={this.connexion} />);
        } else {

            return (
                <div className="App-header App-content Login">
                    <Router>
                        <div>
                            <Switch>
                                <Route path="/" exact component={(props) => <SignIn{...props} connexion={this.connexion}/>} />
                                <Route path="/SignIn" component={(props) => <SignIn{...props} connexion={this.connexion}/>} />
                                <Route path="/SignUp" component={SignUp}/>
                            </Switch>
                            <Redirect exact from="/" to="/SignIn" />

                        </div>
                    </Router>

                    <p style={{fontSize:'1rem', marginTop:'2%'}}> Identity managed by &nbsp;<img style={{width:'15%'}} src={AWSlogo} alt="Logo" /></p>
                    <p style={{fontSize:'1rem'}}>Avinash & Joris </p>
                </div>



            );


        }
    }
}


export default Login;
