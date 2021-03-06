import React, {
    Component, useState
} from 'react';

import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class SignIn extends Component {

    constructor(props) {


        super(props);
        this.hostname = 'https://ece-projectmanager-back.herokuapp.com'
        //this.hostname = 'http://localhost:3001'
        this.login = this.login.bind(this);
        this.backlogin = this.backlogin.bind(this);
        this.renewPassword = this.renewPassword.bind(this);
        this.state = {
            isNew : false,
            count: 0,
            email: "",
            password: "",
            state: '',
            isLoaded: false,
            items: null,
        };

    }




    componentDidMount() {
        console.log("test");
        this.setState({
            isLoaded: false
        });
        if (localStorage.getItem('access_token') != null) {
            this.setState({
                isLoaded: true
            });
            this.props.connexion();
        }
    }

    validateForm() {
        return  this.state.email.length > 0 &&  this.state.password.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    subscribe() {
        console.log("Subscribe");
    }


    renewPassword(){
        console.log('renew');
        fetch(this.hostname+'/renewPassword',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then(res => res.json())
            .then(
                (result) => {

                    console.log(result)
                    console.log(result.status)
                    if (result.status !== "error"){
                        console.log("PASS HERE")
                    this.setState({
                        isLoaded: true,
                        items: result.items,
                        isNew : false
                    });
                    console.log(this.state.isLoaded)
                    }else{
                        console.log("error renew");
                        NotificationManager.error(result.message, 'Error', 5000);
                    }
                },
                (error) => {
                    console.log("error renew");
                    this.setState({
                        isLoaded: false,
                    });
                    console.log(error);
                });
    }

    backlogin(){
        this.setState({isNew : false});
    }
    login() {
        console.log(this.state.email);
        console.log(this.state);
        fetch(this.hostname+'/login',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then(res => res.json())
            .then(
                (result) => {
                    if (result.code === 'NotAuthorizedException'){
                        NotificationManager.error(result.message, '', 3000);
                    }
                    else if(result["value"] != "renew"){
                        console.log("LOGINNNN")
                    console.log(result);
                    localStorage.setItem('username', result.accessToken.username);
                    localStorage.setItem('access_token', result.accessToken.jwtToken);
                    localStorage.setItem('payload', JSON.stringify(result.accessToken.payload));
                    console.log(localStorage.getItem('access_token'));

                    this.setState({
                        isLoaded: true,
                        items: result.items,
                        isNew: false,
                    });
                    console.log(this.state.isLoaded)
                    this.props.connexion();
                    } else {
                        console.log("Reset password")
                        NotificationManager.info('Please reset your password', '', 5000);
                        this.setState({isNew : true});
                        this.setState({password : ""});
                    }
                },
                (error) => {
                    console.log("error logging");
                    NotificationManager.error('Cannot acces to ECE-ProjectManager Server', '', 3000);
                    this.setState({
                        isLoaded: false,
                    });
                    console.log(error);
                }
            )
        console.log(this.state.isLoaded);
    }
    handleToUpdate = (someArg) => {
        alert('We pass argument from Child to Parent: ' + someArg);
    }

    render() {
        if (this.state.isNew){

            return(
                <div>
                    <form  border border-dark onSubmit={this.handleSubmit}>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={e => this.setState({password : e.target.value})}
                                type="password"
                            />
                        </FormGroup>
                        <Button block className="btn  btn-warning"   disabled={!this.validateForm()} onClick={this.renewPassword}>
                            Reset password
                        </Button>
                        <Button block className="btn  btn-warning"  onClick={this.backlogin}>
                            Back to login
                        </Button>
                    </form>
                    <NotificationContainer/>
                </div>

            );
        }else {
            return (
                <div>
                    <form border border-dark onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email">
                            <FormLabel>Username</FormLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.email}
                                onChange={e => this.setState({email: e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                                type="password"
                            />
                        </FormGroup>
                        <Button block className="btn  btn-warning" disabled={!this.validateForm()} onClick={this.login}
                                type="submit">
                            Submit
                        </Button>

                    </form>
                    <NotificationContainer/>
                </div>);
        }
    }
}

export default SignIn;
