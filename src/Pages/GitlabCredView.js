import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";

import GITLABlogo from "../Ressources/gitlab-logo.png";


class GitlabCredView extends Component {


    constructor(props) {


        super(props);
        this.hostname = 'https://ece-projectmanager-back.herokuapp.com'
        this.addGitlabKey = this.addGitlabKey.bind(this);
        this.deleteGitlabKey = this.deleteGitlabKey.bind(this)
        this.userInfo = "";
        this.state = {
            userInfo : "",
            gitlabKey: "",
            isGitlabConnected : false,
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
    handleSubmit(event) {
        event.preventDefault();
    }
    validateForm() {
        return  this.state.gitlabKey.length > 0 ;
    }

    deleteGitlabKey(){
        fetch(this.hostname+'/accessToken_gitlab', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(
            (result) => {
                console.log(result);
                this.props.gitlabKeyAdded('', false);

            },
            (error) => {
                console.log("error");
                console.log(error);
            }
        )

    }
    addGitlabKey(){
        console.log(this.state.gitlabKey)
        fetch(this.hostname+'/accessToken_gitlab', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                gitlabKey: this.state.gitlabKey,
            })
        }).then(
            (result) => {
                console.log(result);
                this.props.gitlabKeyAdded(this.state.gitlabKey, true);
            },
            (error) => {
                console.log("error");
                console.log(error);
                this.props.gitlabKeyAdded('error', false);
            }
        )

    }
    render() {

        const isConnected = this.props.gitlabKey === '' ? false : true;

        if (isConnected){
            return (
            <div style={{marginRight:'auto',marginLeft:'auto', marginTop: '15%', width: '35%'}}>
                <p style={{color: 'grey'}}>
                    {this.props.gitlabKey}
                </p>
                <Button block className="btn  btn-danger"
                        onClick={this.deleteGitlabKey} >
                    Delete
                </Button>
                <img style={{width: '45%'}} src={GITLABlogo} alt="Logo"/>
            </div>);
        }else {
            return (

                <div style={{marginRight:'auto',marginLeft:'auto', marginTop: '15%', width: '35%'}}>
                    {this.props.gitlabKey}
                    {isConnected ? this.props.gitlabKey : ''}
                    <form border border-dark onSubmit={this.handleSubmit}>
                        <FormGroup controlId="token">
                            <FormLabel>Your personal Gitlab Token</FormLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.gitlabKey}
                                onChange={e => this.setState({gitlabKey: e.target.value})}
                            />
                        </FormGroup>
                        <Button block className="btn  btn-warning" disabled={!this.validateForm()}
                                onClick={this.addGitlabKey} type="submit">
                            Submit
                        </Button>
                    </form>


                    <img style={{width: '45%'}} src={GITLABlogo} alt="Logo"/>


                </div>

            );
        }
    }
}

export default GitlabCredView;

/*<Card bg="warning" text="grey" style={{ width: '25rem' }}>
                        <Card.Body>
                            <Card.Title> Welcome to Watermelon &nbsp;
                                {this.props.user.first_name}</Card.Title>
                            <Card.Text>
                                Avalaible : {this.props.balance} €
                            </Card.Text>
                        </Card.Body>
                <Link to={"/Pages/DepositView"}>
                    <Button block className="btn-dark"  type="submit">
                       Deposit
                    </Button>
                </Link>
                <Link to={"/Pages/WithdrawView"}>
                    <Button style={{marginTop: 0.5 + 'em'}}  block className="btn-dark"  type="submit">
                        Withdraw
                    </Button>
                </Link>
                    </Card>*/