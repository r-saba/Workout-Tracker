import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import firebase from './firebase';
import './style.scss';

const App = () => {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    let exerciseData = [];
    firebase.firestore()
      .collection('exercise')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let storedExercise = doc.data();
          storedExercise['id'] = doc.id;
          exerciseData.push(storedExercise);
        })
    })
      .then(() => setExercise(exerciseData));
  }, [])

  const onSubmit = (data, e) => {
    firebase.firestore().collection("exercise").add({
      Exercise: data.Exercise,
      Sets: data.Sets,
      Reps: data.Reps,
    })
    setExercise([...exercise, data]);
    e.target.reset();
  }

  const completeExercise = (index) => {
    exercise[index].Completed = "true";
  }

  const removeExercise = (key) => {
    firebase.firestore().collection("exercise").doc(exercise[key].id)
      .delete()
    const exerciseState = [...exercise];
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
