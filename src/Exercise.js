import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';

const Exercise = (props) => {
	const sets =[];
	const { register, handleSubmit, watch } = useForm();
	const watchWeight = watch('weight', props.exercise.Weight); // supply default value as second argument

	useEffect(() => console.log(watchWeight));

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
				<h2>{props.index}</h2>
				<form onSubmit={handleSubmit(props.updateWeight)}>
					<label>Weight</label>
					<input name="weight" value={watchWeight} ref={register} type="text"/> 
					<input name="index" value={props.index} ref={register} type="hidden"/> 
				</form>
				<button onClick={() => props.removeExercise(props.index)}>Remove Exercise</button>
			</div>
			{exerciseSets}
		</div>
	)
}

export default Exercise;