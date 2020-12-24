import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.state = {
            count: 0,
            first_name:"",
            last_name:"",
            email: "",
            password: "",
            isChecked : false,
            state: '',
            isLoaded: true,
            items: null,

            /*option : {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            }*/
        };

    }

    subscribe() {
        console.log(this.state.isChecked);

        fetch('http://localhost:8000/v1/users',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                last_name: this.state.last_name,
                first_name: this.state.first_name,
                email: this.state.email,
                password: this.state.password,
                is_admin: this.state.isChecked
            })
        }).then(res => res.json())
            .then(
                (result) => {

                  console.log("Account created");
                  console.log(result);
                    // this.handleToUpdate('someVar');
                },
                (error) => {
                    console.log("error");
                    this.setState({
                        isLoaded: false,
                    });
                    console.log(error);
                }
            )

    }


    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    validateForm() {
        return  this.state.email.length > 0 &&  this.state.password.length > 0
            && this.state.last_name.length > 0 && this.state.first_name.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
    }


    login() {
        console.log(this.state.email);

        fetch('http://localhost:8000/v1/users',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                is_admin: false

            })
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                    console.log(this.state.isLoaded);
                    this.handleToUpdate('someVar');
                },
                (error) => {
                    console.log("error");
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
            <div className="">

                <form border border-dark  onSubmit={this.handleSubmit}>
                    <FormGroup controlId="first_name" >
                        <FormLabel>First name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.first_name}
                            onChange={e => this.setState({first_name : e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup controlId="last_name" >
                        <FormLabel>Last Name</FormLabel>
                        <FormControl  type="text"
                                       value={this.state.last_name}
                                       onChange={e => this.setState({last_name : e.target.value})} />
                    </FormGroup>
                    <FormGroup controlId="email" >
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
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
                    <FormGroup controlId="formBasicCheckbox">

                        <FormLabel>Admin</FormLabel>

                        <FormControl  type="checkbox"
                                     checked={this.state.isChecked}
                                     onChange={this.toggleChange}/>



                    </FormGroup>
                    <Button block className="btn btn-warning"  disabled={!this.validateForm()} onClick={this.subscribe} type="submit">
                        Submit
                    </Button>

                </form>
            </div> );
    }
}

export default SignUp;