import React, {useState} from 'react';

const Exercise = (props) => {
	const sets =[]
	const [remainingSets, setRemainingSets] = useState(props.exercise.Sets-1);
	const completedSet = (e) => {
		console.log(e.target);
		console.log(e.target.style);
		e.target.style.backgroundColor = '#CD5C5C';
		setRemainingSets(remainingSets-1);
		if(remainingSets == 0) {
			props.completeExercise(props.index);
		}
	}
	let styling = {};
	if(props.exercise.Completed == 'true')
		styling = {display: 'none'}

	for (var i = 0; i < props.exercise.Sets; i++) {
		sets.push(
			<li 
			className="exercise_reps" 
			onClick={completedSet} 
			key={i}>
			<span> {props.exercise.Reps} </span>
			</li>
		)
	}

	let exerciseSets;
	if (props.exercise.Completed == 'false') {
		exerciseSets =	<ul className="exercise_sets"> {sets} </ul>;
	}
	else {
		exerciseSets = <p>All sets complete for {props.exercise.Exercise}</p>
	}

	return (
		<div>
			<h2>{props.exercise.Exercise}</h2>
			<button onClick={() => props.removeExercise(props.index)}>X</button>
			{exerciseSets}
		</div>
	)
}

export default Exercise;