import * as React from 'react';

interface MyProps{
	jobs,
	employer,
	fetchAllEmployerJobModels,
}

class EditJobsComponent extends React.Component<MyProps>{
	constructor(props){
		super(props);

		console.log(this.props.jobs);
		this.displayJobList = this.displayJobList.bind(this);
		this.createJobList = this.createJobList.bind(this);
	}

	/*This will check to see if the employer has any job posts, if it does it will create a list of job posts. If not it should
	 * display a message saying that they will be posted here once there is some.*/
	displayJobList(){
		return this.props.jobs.length > 0 ? `You have this many job posts..${this.props.jobs.length}` : `We will display your job posts here once you submit some`;
	}

	createJobList(){
		const jobList = this.props.jobs.map(job => <li key={job} >{job}</li>);
		return (
			<ul>
				{jobList}
			</ul>
		)
	}

	render(){
		return(
			<div>
				<h1>I'm the Edit Jobs Container</h1>
				<p>{this.displayJobList()}</p>
				{this.createJobList()}
				{/*TODO we will need a list of jobs that we can edit.
				 We will need to edit the title of the jobs.
				 the description of the job.
				 the keywords of the job and be able to delete the job.*/}
			</div>
		)
	}
}

export default EditJobsComponent;