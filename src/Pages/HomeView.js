import React, {
    Component,
} from 'react';

class HomeView extends Component {




    render() {
        return(
            <div className="" style={{marginTop:'5%',float: 'left', width: '100%', paddingLeft:'20%'}} id="repositories">
            <div style={{textAlign: 'left'}}><p style={{fontSize: '1.8rem'}}>ECE Organization</p>

                <ul>
                    {this.props.gitlab_ece.map(function(name, index){
                        return <div key={ index }>{name}</div>;
                    })}
                </ul>
            </div>
        <div style={{textAlign: 'left',marginTop:'5%'}}><p style={{fontSize: '1.8rem'}}>Public</p>
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

