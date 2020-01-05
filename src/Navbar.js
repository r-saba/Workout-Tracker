import React from 'react';

const Navbar = (props) =>  {
	const exerciseDays = props.exerciseDaysState;

	return (
	<nav>
		<ul>
	        {Object.keys(exerciseDays).map(key => <li key={key}><a onClick={() => props.selectDay(exerciseDays[key])}>{exerciseDays[key]}</a></li>)}
		</ul>
	</nav>
	)
}

export default Navbar;