import React, {Component} from 'react';
import { Link } from 'react-router-dom'


class SlidingMenu extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
      return(
        <div className={"sliding-menu animated " + this.props.slideClass} style={{"z-index": "1"}}>
          <button type="button" onClick={this.props.onClick}>
          <i  style={{color:"white"}}class="fa fa-arrow-left" aria-hidden="true"></i>
            {/* <span className="glyphicon glyphicon-arrow-left">Hello</span> */}
          </button>
          {this.props.children}
        </div>
      );
    }
  }
  
 export default class Sidebar extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        toggleMenu: false
      }
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      console.log(this.state.toggleMenu);
      this.setState({toggleMenu: !this.state.toggleMenu});
    }
    handleLogout = (event) => {
        event.preventDefault()
        localStorage.clear()
        window.location = '/'

    }
    
    render(){
      let slideClass;
      this.state.toggleMenu
        ? slideClass = 'slideInLeft slide-menu'
        : slideClass = 'slideInRight';
      
      return(
        <div className="left-side-menu content-desktop">
               <div class="panel-group" id="accordion">
	<h6>Sports</h6>
			            <div class="panel panel-default">
                    <div class="panel-heading-sidebar">
                        <h4 class="panel-title">
							<p >In-Play</p>
                        </h4>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading-sidebar">
                        <h4 class="panel-title">
							<Link to='/superAdmin/cricketMarket' >Cricket</Link>
                        </h4>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading-sidebar">
                        <h4 class="panel-title">
							<Link to='/superAdmin/SuperAdminCasinoLiveHistory' >Casino</Link>
                        </h4>
                    </div>
                </div>
                    </div>
                    </div>
        
      );
    }
  }