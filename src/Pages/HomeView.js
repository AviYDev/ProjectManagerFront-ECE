import React, {
    Component,
} from 'react';

class HomeView extends Component {




    render() {
        return(
            <div className="" style={{marginTop:'10%',float: 'left', width: '100%', paddingLeft:'10%'}} id="repositories">
            <div style={{textAlign: 'left',float: 'left'}}><p style={{fontSize: '1.8rem'}}>ECE Organization</p>

                <ul>
                    {this.props.gitlab_ece.map(function(name, index){
                        return <div key={ index }>{name}</div>;
                    })}
                </ul>
            </div>
        <div style={{marginLeft:'10%',textAlign: 'right',float: 'left'}}><p style={{fontSize: '1.8rem'}}>Public</p>
            <ul>
                {this.props.gitlab_public.map(function(name, index){
                    return <div key={ index }>{name}</div>;
                })}
            </ul>
        </div>

</div>
        );
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