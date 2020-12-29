import React, {
    Component, useState
} from 'react';
import {Route, Switch} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            count: 0,
            email: "",
            password: "",
            state: '',
            isLoaded: true,
            items: null,
        };

    }



    componentDidMount() {
        console.log("test");
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

    login() {
        console.log(this.state.email);
        console.log(this.state);
        fetch('https://ece-project-manager-back.herokuapp.com/login',  {
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

                    localStorage.setItem('username', result.accessToken.username);
                    localStorage.setItem('access_token', result.accessToken.jwtToken);
                    localStorage.setItem('payload', JSON.stringify(result.accessToken.payload));
                    console.log(localStorage.getItem('access_token'));
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                    console.log(this.state.isLoaded)
                    this.props.connexion();
                   // this.handleToUpdate('someVar');
                },
                (error) => {
                    console.log("error logging");
                    NotificationManager.error('', 'Cannot acces to ECE-ProjectManager Server', 5000);
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
        return(
            <div>
                <form  border border-dark onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" >
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.email}
                            onChange={e => this.setState({email : e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={e => this.setState({password : e.target.value})}
                            type="password"
                        />
                    </FormGroup>
                    <Button block className="btn  btn-warning"  disabled={!this.validateForm()} onClick={this.login} type="submit">
                        Submit
                    </Button>

                </form>
            </div> );
    }
}

export default SignIn;