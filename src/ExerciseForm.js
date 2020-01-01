import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

export default function ExerciseForm(props) {
  const { register, handleSubmit, reset } = useForm();


  return (
    <form className="exercise_form" onSubmit={handleSubmit(props.onSubmit)}>
      <input type="text" placeholder="Exercise" name="Exercise" ref={register({required: true, maxLength: 80})} />
      <input type="number" placeholder="Sets" name="Sets" ref={register({required: true, maxLength: 12})} />
      <input type="number" placeholder="Reps" name="Reps" ref={register({required: true, maxLength: 100})} />
      <input type="number" placeholder="Starting Weight" name="Weight" ref={register({required: true, maxLength: 100})} />
      <input type="hidden" name="Completed" value="false" ref={register} />
      <input type="submit" />
    </form>
  );
}