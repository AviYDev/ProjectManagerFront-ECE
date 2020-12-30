import React, {
    Component,
} from 'react';

class AdminView extends Component {




    render() {
        return(

            <div style={{textAlign: 'center', marginTop:"20%"}}>
                <p style={{fontSize: '1.8rem'}}>
                Admin Settings in order to give automatic repository access and more
                </p>

            </div>

        );
    }
}

export default AdminView;

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