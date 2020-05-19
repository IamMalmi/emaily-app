import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './payment';

class Header extends Component{
    renderContent(){
        switch (this.props.auth){
            case null:
            return '';
            case false:
            return <li><a href ="/auth/google">Login with Google</a></li>;
            default:
            return [
               <li key='1'><Payment></Payment></li> ,   
               <li key='2'><a href = "/api/logout">Log out</a></li>,
               <li key='3' style={{margin:'0 10px'}}>Your have {this.props.auth.credits} credits</li>
               
               ];
        }}

        render(){
           console.log(this.props.auth+"kkkkn");
        return(
        <nav>
        <div className="nav-wrapper">
        <Link
        to={this.props.auth?'/survey':'/'}
        className="left brand-logo">
        Emaily
        </Link>
        <ul className="right">
         {this.renderContent()}
        
        </ul>
        </div>
        </nav>
        );
        }   
}

function mapStateProps({auth}){
    return{auth}
}

export default connect(mapStateProps)(Header);