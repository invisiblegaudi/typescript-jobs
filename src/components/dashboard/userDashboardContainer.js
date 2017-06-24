import React from 'react';
import {connect} from 'react-redux';
// import { Switch, Route } from 'react-router'
import {bindActionCreators} from 'redux';
import {Redirect, Switch, Route} from 'react-router-dom';

import {fetchThisUserInfo} from '../../actions/authActions';
import {submitEmployerRegistration} from '../../actions/employerDashboardActions';

//styles
import './userDashboardContainer.scss';

//components
import UserDashboardNavMenu from "./nav-menu/userDashboardNavMenu";
import CompRegisterComponent from "./compRegister/compRegisterComponent";

//layouts
import MainLayout from './main-layout/mainLayout';


/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
 * Should we pull user info on load?
 * or should we check if the user has an employer?
 * I think you should check that THEN do a get request to get employer info
 * if employer property is not inside then show create/submit job buttons*/

/*What components are you going to need for the dashboard?
 * list of the latest applicants
 * possibly list of job posts with info like when it was posted, total applicant count
 * an applicant at a glance component
 * a component to view the applicants resume on click*/


/*need to show a company sign up form before proceeding*/
class UserDashboardContainer extends React.Component {
	constructor(props) {
		super(props);
		
		this.fetchEmployerInfo = this.fetchEmployerInfo.bind(this);
		this.checkForLogInErrors = this.checkForLogInErrors.bind(this);
		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.checkForEmployer = this.checkForEmployer.bind(this);
	}
	
	componentDidMount() {
		this.fetchEmployerInfo();
	}
	
	//this will fire when we first load into the dashboard
	fetchEmployerInfo() {
		//get the userId from the URL params and send it to the action creator
		let userId = this.props.user.userId;
		this.props.fetchThisUserInfo(userId);
	}
	
	checkForLogInErrors() {
		//TODO probably need to reroute to the login page with an error message displayed
		return this.props.user.authorized === false ? <Redirect to={`${'/login'}`}/> : null;
	}

	handleEmployerRegistration(employerData){
		console.log("inside the userDashboardContainer with", employerData);
		let userData = {employerData, userId: this.props.user.userId};
		this.props.submitEmployerRegistration(userData);
	};
	
	/*This will check to see if the user property has an employer listed.
	* If it does not we will display the employer registration component.
	* Otherwise we weill load up the main layout*/
	
	//todo...now I don't know if it makes more sense to use a switch route or do this..
	checkForEmployer(){
		
		
		return this.props.user.employer === null ? <Redirect to={`${this.props.match.url}/:register`}/> : <Redirect to={`${this.props.match.url}/:home`}/>;
		
		
		// return this.props.user.employer === null ?
		// 	{/*<CompRegisterComponent submitData={this.handleEmployerRegistration}/> : <MainLayout user={this.props.user}/>*/}
	}
	
	render() {
		// return(
		// 	<div className="jb-dashboard">
		// 		<MainLayout>
		// 			<Route path={thi}>
		//
		// 			</Route>
		// 		</MainLayout>
		// 	</div>
		// )
		//
		
		return (
			<div className="jb-dashboard">
				{this.checkForLogInErrors()}
				<UserDashboardNavMenu/>
				{this.checkForEmployer()}
				{console.log(`${this.props.match.url}/register`)}
				<Route path={`${this.props.match.url}/:register`} component={CompRegisterComponent}/>
				<Route path={`${this.props.match.url}/:home`} component={MainLayout}/>
				
			</div>
		)
	}
};

function mapStateToProps(state) {
	return {
		user: state.user,
		employer: state.employer
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchThisUserInfo, submitEmployerRegistration }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardContainer);