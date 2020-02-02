import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Card, Button, Form} from 'react-bootstrap';


const Exercise = (props) => {
	const sets =[];
	const { register, handleSubmit, watch } = useForm();
	const watchWeight = watch('weight', props.exercise.Weight); // supply default value as second argument

	for (var i = 0; i < props.exercise.Sets; i++) {
		sets.push(
			<li 
			className="exercise_reps" 
			onClick={(e) => props.completeSet(e, props.index)} 
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
			<Card body>
				<Card.Title>{props.index}</Card.Title>
				{exerciseSets}
				<div className="remove-exercise-container">
				<Form onSubmit={handleSubmit(props.updateWeight)}>
				  <Form.Group controlId="formGroupWeight" className="exercise__weight-form">
				    <Card.Text className="card-weight">Weight</Card.Text>
				    <Form.Control type="number" className="exercise__weight" name="weight" value={watchWeight} ref={register}/>
				    <Card.Text>lbs</Card.Text>
				  </Form.Group>
				  <Form.Group controlId="formGroupWeight">
				    <Form.Control type="hidden" name="index" value={props.index} ref={register}/>
				  </Form.Group>
				</Form>
				<Button onClick={() => props.removeExercise(props.index)} variant="primary">Remove Exercise</Button>
				</div>
			</Card>
			<div className="exercise_title">
			</div>
		</div>
	)
}

export default Exercise;