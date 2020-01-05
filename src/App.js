import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import firebase from './firebase';
import './style.scss';

const App = () => {
  const [exercise, setExercise] = useState({});
  const [exerciseDaysState, setExerciseDays] = useState({});
  let db = firebase.firestore().collection('exercise');

  useEffect(() => {
    let exerciseDays = [];
    db
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => exerciseDays.push(doc.id));
    })
    .then(setExerciseDays(exerciseDays));

    let exerciseData;
      db.doc("Day 1").get()
      .then((doc) => {
        if(doc.exists) {
          exerciseData = doc.data();
        }
      })
      .then(() => {
        setExercise(exerciseData);
      })
  }, [])

  const onSubmit = (data, e) => {
    let exerciseData = {
      [data.Exercise]: {
        Sets: data.Sets,
        Reps: data.Reps,
        Weight: data.Weight
      }
    }
    db.doc(data.day).update(exerciseData);
    data.remainingSets = data.Sets;
    setExercise({...exercise, ...exerciseData});
    e.target.reset();
  }

  const updateWeight = (data) => {
    return db.update({
       [data.index + '.Weight']: data.weight
    })
  }

  const completedSet = (e, index) => {
    let completedSetExercise = [...exercise];
    completedSetExercise[index].remainingSets -= 1;
    setExercise(completedSetExercise);
    e.target.style.backgroundColor = '#CD5C5C';
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

  console.log(Object.keys(exercise))

  return(
    <>
      <ExerciseForm exerciseDaysState={exerciseDaysState} onSubmit={onSubmit} />
      {Object.keys(exercise).map(key => 
        <Exercise 
        key={key}
        index={key}
        exercise={exercise[key]}
        updateWeight={updateWeight}
        />
      )}
    </>
  );
}

export default App;
