import React, {useState} from 'react';

const Exercise = (props) => {
	const sets =[]
	const [remainingSets, setRemainingSets] = useState(props.exercise.Sets);
	const completedSet = (e) => {
		console.log(e.target);
		console.log(e.target.style);
		e.target.style.backgroundColor = '#CD5C5C';
		setRemainingSets(remainingSets-1);
		props.completeExercise(props.index);
	}

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