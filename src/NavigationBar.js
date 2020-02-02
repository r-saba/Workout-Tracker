import React from 'react';
import {Navbar, NavDropdown, Nav, Form, FormControl, Button} from 'react-bootstrap';

const NavigationBar = (props) =>  {
	const exerciseDays = props.exerciseDaysState;

	return (
	<nav>
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="#home">Workout Tracker</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link onClick={() => props.updateExerciseFormState()}>Add Exercise</Nav.Link>
			  {Object.keys(exerciseDays).map(key => <Nav.Link key={key}><a onClick={() => props.selectDay(exerciseDays[key])}>{exerciseDays[key]}</a></Nav.Link>)}
			</Nav>
			</Navbar.Collapse>
		</Navbar>
	</nav>
	)
}

export default NavigationBar;