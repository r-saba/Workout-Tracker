import React, {useState} from 'react';

const Exercise = (props) => {
	const sets =[]
	for (var i = 0; i < props.exercise.Sets; i++) {
		sets.push(<li className="exercise_reps" key={i}><span> {props.exercise.Reps} </span></li>)
	}
	return (
		<div>
			<h2>{props.exercise.Exercise}</h2>
			<ul className="exercise_sets">
				{sets}
			</ul>
		</div>
	)
}

export default Exercise;