import React from 'react';

const Navbar = (props) =>  {
	const exerciseDays = props.exerciseDaysState;

	return (
	<nav>
		<ul>
			<li><a onClick={() => props.updateExerciseFormState()}>Add Exercise</a></li>
	        {Object.keys(exerciseDays).map(key => <li key={key}><a onClick={() => props.selectDay(exerciseDays[key])}>{exerciseDays[key]}</a></li>)}
		</ul>
	</nav>
	)
}

export default Navbar;