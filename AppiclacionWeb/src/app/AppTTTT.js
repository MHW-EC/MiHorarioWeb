import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			tasks: [],
		};
		this.addTask = this.addTask.bind(this);
		this.getTasks = this.getTasks.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	deleteTask(idTask) {
		event.preventDefault();
		fetch(`/api/task/${idTask}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				M.toast({ html: data.status });
				this.getTasks();
			})
			.catch((err) => console.error(err));
	}

	addTask(event) {
		event.preventDefault();
		console.log(this.state);

		fetch('/api/task', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state),
		})
			.then((res) => res.json())
			.then((data) => {
				M.toast({
					html: data.status,
				});
				this.setState({ title: '', description: '' });
				this.getTasks();
			})
			.catch((err) => console.error(err));
	}

	getTasks() {
		fetch('/api/task')
			.then((res) => res.json())
			.then((data) => {
				this.setState({ tasks: data });
			});
	}

	handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	componentDidMount() {
		this.getTasks();
	}

	render() {
		return (
			<div>
				<nav className='light-blue darken-4'>
					<div className='container'>
						<a className='brand-logo' href='/'>
							MERN STACK
						</a>
					</div>
				</nav>

				<div className='container'>
					<div className='row'>
						<div className='col s5'>
							<div className='card'>
								<div className='card-content'>
									<form onSubmit={this.addTask}>
										<div className='row'>
											<div className='input-field col s12'>
												<input
													name='title'
													onChange={this.handleChange}
													type='text'
													value={this.state.title}
													placeholder='Titulo'
												></input>
											</div>
											<div className='input-field col s12'>
												<textarea
													name='description'
													onChange={this.handleChange}
													className='materialize-textarea'
													type='text'
													value={this.state.description}
													placeholder='Descripción'
												></textarea>
											</div>
											<div className='input-field col s12'>
												<button
													className='btn light-blue darken-4'
													type='submit'
												>
													Enviar
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className='col s7'>
							<table>
								<thead>
									<tr>
										<th>Título</th>
										<th>Descripción</th>
									</tr>
								</thead>
								<tbody>
									{this.state.tasks
										.slice(0)
										.reverse()
										.map((task) => {
											return (
												<tr key={task._id}>
													<td>{task.title}</td>
													<td>{task.description}</td>
													<td>
														<Button variant='outlined' color='primary'>
															Primary
														</Button>
														<button
															className='btn light-blue darken-4 '
															style={{ margin: '4px' }}
															onClick={() => {
																this.deleteTask(task._id);
															}}
														>
															<i className='material-icons'>delete</i>
														</button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
