import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import "./style.scss";

const App = () => {
  const [exercise, setExercise] = useState([]);

  useEffect(() => alert("ayo!"));

  const onSubmit = (data, e) => {
    setExercise([...exercise, data]);
    e.target.reset();
  }

  const completeExercise = (index) => {
    exercise[index].Completed = "true";
  }

  const removeExercise = (key) => {
    const exerciseState = [...exercise];
    delete exerciseState[key];
    exerciseState.splice(key, 1);
    setExercise(exerciseState);
  }
  return(
    <>
      <ExerciseForm onSubmit={onSubmit} />
      {Object.keys(exercise).map(key => <Exercise 
        key={key}
        index={key}
        exercise={exercise[key]}
        completeExercise={completeExercise}
        removeExercise={removeExercise}
      />)}
    </>);
}

export default App;
