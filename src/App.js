import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import "./style.scss";

const App = () => {
  const [exercise, setExercise] = useState([]);
  const onSubmit = data => setExercise([...exercise, data]);
  return(
    <>
      <ExerciseForm onSubmit={onSubmit} />
      {Object.keys(exercise).map(key => <Exercise 
        key={key}
        exercise={exercise[key]}
      />)}
    </>);
}

export default App;
