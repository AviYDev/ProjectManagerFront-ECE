import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Navbar, Nav, NavDropdown, Card} from 'react-bootstrap'
import Col from "react-bootstrap/Col";
import {Route, Switch} from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";
import ModalHeader from "react-bootstrap/ModalHeader";
class HomeView extends Component {




    render() {
        return(<div> Test</div>     );
    }
}

export default HomeView;

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