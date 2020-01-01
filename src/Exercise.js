import React, {useState, useEffect} from 'react';

const Exercise = (props) => {
	const sets =[]

	useEffect(() => console.log('test'));

	for (var i = 0; i < props.exercise.Sets; i++) {
		sets.push(
			<li 
			className="exercise_reps" 
			onClick={(e) => props.completedSet(e, props.index)} 
			key={i}>
			<span> {props.exercise.Reps} </span>
			</li>
		)
	}

	let exerciseSets;
	if (props.exercise.remainingSets != 0) {
		exerciseSets =	<ul key={props.exercise.id} className="exercise_sets"> {sets} </ul>;
	}
	else {
		exerciseSets = <p>All sets complete for {props.exercise.Exercise}</p>
	}

	return (
		<div>
			<div className="exercise_title">
				<h2>{props.exercise.Exercise}</h2>
				<button onClick={() => props.removeExercise(props.index)}>Remove Exercise</button>
			</div>
			{exerciseSets}
		</div>
	)
}

export default Exercise;