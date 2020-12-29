import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Navbar, Nav, NavDropdown, Card} from 'react-bootstrap'
import Col from "react-bootstrap/Col";

import Toast from "react-bootstrap/Toast";
import '../bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import GitlabCredView from "../Pages/GitlabCredView";
import HomeView from "../Pages/HomeView";
import {Redirect} from "react-router";

class Home extends Component {

    constructor(props) {
//http://localhost:3001

        super(props);
        this.hostname = 'https://ece-projectmanager-back.herokuapp.com'
        this.disconnect = this.disconnect.bind(this);
        this.gitlabKeyAdded = this.gitlabKeyAdded.bind(this);
        this.getRepolist = this.getRepolist.bind(this);
        this.userInfo = "";
        this.state = {
            userInfo : "",
            gitlabKey: "",
            isGitlabConnected : false,
            userPayload:"",
            balance : "",
            showA : true,
            redirect: false,

            gitlab_public:[],
            gitlab_ece:[],


        };

    }

    toggleShowA  = () => {
        this.setState({showA: !this.state.showA});
    }



    disconnect() {
        localStorage.clear();
        this.setState({redirect: true});
        window.location.reload(false);


    }


    getRepolist(){
        NotificationManager.info('','Loading projects ...', 2000);
        fetch(this.hostname+'/all_repolist_gitlab', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                gitlabKey: this.state.gitlabKey,
            })
        }).then(res => res.json()).then(
            (result) => {
                //console.log(result);
                let projects = [];
                for (let i = 0; result.length > i; i++){
                        projects.push(result[i].name)
                }
                console.log(projects);
                this.setState({ gitlab_public: projects})
            },
            (error) => {
                console.log("error");
                console.log(error);
                NotificationManager.error('', 'Cannot acces to Gitlab', 5000);
            }
        )


        fetch(this.hostname+'/ece_repolist_gitlab', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                gitlabKey: this.state.gitlabKey,
            })
        }).then(res => res.json()).then(
            (result) => {
                //console.log(result);
                let projects = [];
                for (let i = 0; result.length > i; i++){
                    projects.push(result[i].name)
                }
                console.log(projects);
                this.setState({ gitlab_ece: projects})


            },
            (error) => {
                console.log("error");
                console.log(error);
                NotificationManager.error('', 'Cannot acces to Gitlab', 5000);
            }
        )
      //  setTimeout(this.getRepolist, 20000);
    }
    gitlabKeyAdded(gitlabKey, isConnected){

        this.setState({ gitlabKey: gitlabKey })
        this.setState({ isGitlabConnected: isConnected })

    if (gitlabKey === 'error'){
        NotificationManager.error('', 'Wrong gitlab Token', 3000);
        }else {
    if (isConnected) {
        NotificationManager.success(this.state.gitlabKey, 'Gitlab connected', 3000);
        this.getRepolist();
    } else {
        NotificationManager.warning('', 'Gitlab token deleted', 5000);
    }

}

    }
    componentDidMount() {

        this.setState({redirect: false});


        fetch(this.hostname+'/getUser',  {
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
                NotificationManager.info('','Welcome '+this.state.userInfo.Username, 5000);

                console.log(this.state);
                let result = this.state.userInfo.UserAttributes.map(a => a.Name);
                console.log(result)
                if (result.includes("custom:access_token_gitlab")){
                    console.log("There is key")

                    this.setState({ gitlabKey: this.state.userInfo.UserAttributes.find(x=>x.Name === "custom:access_token_gitlab").Value })
                    this.setState({isGitlabConnected : true})
                    this.getRepolist();

                    NotificationManager.success(this.state.gitlabKey,'Gitlab connected', 5000);

                }else{
                    NotificationManager.warning('','Please add your Gitlab Token to start', 20000);

                }


            })
            .catch(console.log)
    }

    render() {
        const { redirect } = this.state;

        if (this.state.redirect) {
            return (
                <Router>
                    <Redirect exact from="/" to='/SignIn'/>
                </Router>);
        }


            return (
                <div className="App-header">

                    <Router>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                                <Navbar.Brand>ECE Project Manager</Navbar.Brand>


                            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <ButtonToolbar>
                                        <Link to={"/Pages/HomeView"}>
                                            <Button  className="NavButton" >Home</Button>
                                        </Link>
                                        <Link to={"/Pages/GitlabCredView"}>
                                            <Button  className="NavButton" >Gitlab Token</Button>
                                        </Link>


                                    </ButtonToolbar>

                                </Nav>
                                <Nav>

                                    <Navbar.Text>
                                        Signed in as : <a href="#login"> &nbsp;{this.state.userInfo.Username} </a>
                                    </Navbar.Text>
                                </Nav>
                                <Nav><ButtonToolbar>
                                    <Button className="NavButton" onClick={this.disconnect}>Disconnect </Button>
                                </ButtonToolbar>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>


                        <div>



                            {this.state.redirect  ?  <Redirect to="/sign-in"/> :

                            <div>

                                <Switch>


                                    <Route path="/Pages/HomeView" component={(props) => <HomeView{...props} gitlab_public={this.state.gitlab_public} gitlab_ece={this.state.gitlab_ece} />} />
                                    <Route path="/Pages/GitlabCredView" component={(props) => <GitlabCredView{...props}  gitlabKey={this.state.gitlabKey} gitlabKeyAdded={this.gitlabKeyAdded} user={this.state.userInfo}  />} />

                                </Switch>
                                <Redirect exact from="/" to="/Pages/HomeView" />

                            </div>
}


                        </div>
                    </Router>
                    <NotificationContainer/>
                </div>

            );
    }
}



export default Home;
