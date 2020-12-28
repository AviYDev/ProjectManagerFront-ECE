import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Navbar, Nav, NavDropdown, Card} from 'react-bootstrap'
import Col from "react-bootstrap/Col";

import Toast from "react-bootstrap/Toast";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {Redirect} from "react-router";

class Home extends Component {

    constructor(props) {


        super(props);
        this.disconnect = this.disconnect.bind(this);
        this.userInfo = "";
        this.state = {
            userInfo : "",
            userPayload:"",
            balance : "",
            showA : true,
            redirect: false,

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

    toggleShowA  = () => {
        this.setState({showA: !this.state.showA});
    }

    disconnect() {
        localStorage.clear();
        this.setState({redirect: true});

    }

    solde(){
        console.log("solde methode")
        fetch('http://localhost:8000/v1/wallets/'+localStorage.getItem('id'),{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('wallet_id', data.wallet_id);
                this.setState({ balance: data.balance })
            })
            .catch(console.log)
    }
    componentDidMount() {

        this.setState({redirect: false});


        fetch('http://localhost:3001/getUser',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token':localStorage.getItem('access_token'),
            }
        })   .then(res => res.json())
            .then((data) => {
                console.log('UserInfo !');

                this.setState({ userInfo: data })
                this.setState({ userPayload:  JSON.parse(localStorage.getItem('payload'))})

                console.log(this.state);
                let result = this.state.userInfo.UserAttributes.map(a => a.Name);
                console.log(result)
                if (!result.includes("custom:access_token_gitlab")){
                    alert("EMPTY");
                }

                //TODO UI to change password and put secret key from gitlab

                if (this.state.userInfo.Username == "Avinash") {
                    fetch('http://localhost:3001/accessToken_gitlab', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    }).then(
                        (result) => {
                            console.log(result);
                        },
                        (error) => {
                            console.log("error");
                            console.log(error);
                        }
                    )

                }


            })
            .catch(console.log)
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/SignIn'/>;
        }

        return(
            <div className="App-header">

                <Router>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to={"/Pages/HomeView"}>
                        <Navbar.Brand>ECE Project Manager</Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <ButtonToolbar>



                            </ButtonToolbar>

                        </Nav>
                        <Nav>

                            <Navbar.Text>
                                Signed in as :  <a href="#login"> &nbsp;{this.state.userInfo.Username} </a>
                            </Navbar.Text>
                        </Nav>
                        <Nav><ButtonToolbar>
                        <Button  className="NavButton" onClick={this.disconnect} >Disconnect </Button>
                        </ButtonToolbar>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>




                <div className="App-header App-content">


                    {this.state.userPayload["cognito:groups"]}

                </div>
            </Router>

            </div>

        );
    }
}



export default Home;

/*
*  <div>
                            <Switch>


                                <Route path="/" exact component={(props) => <HomeView{...props} user={this.state.userInfo} balance={this.state.balance} />} />
                                <Route path="/Pages/HomeView" component={(props) => <HomeView{...props} user={this.state.userInfo} balance={this.state.balance} />} />



                            </Switch>
                            <Redirect exact from="/" to="/Pages/HomeView" />

                        </div>
*/
/*

                             <!--   <Link to={"/Pages/TransfersView"}>
                                    <Button  className="NavButton" >Transfers</Button>
                                </Link>
                                <Link to={"/Pages/CardsView"}>
                                    <Button className="NavButton"  >Cards</Button>
                                </Link>
                                <Link to={"/Pages/HistoricView"}>
                                    <Button className="NavButton"  >Historic</Button>
                                </Link>
-->
*/