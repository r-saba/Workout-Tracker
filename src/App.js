import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import Navbar from './Navbar';
import firebase from './firebase';
import './style.scss';

const App = () => {
  const [exercise, setExercise] = useState({});
  const [exerciseDaysState, setExerciseDays] = useState({});
  const [exerciseDay, setExerciseDay] = useState("");
  
  let db = firebase.firestore().collection('exercise');
  if (exerciseDay === "") {setExerciseDay("Day 1")}

  useEffect(() => {
    let exerciseDays = [];
    db
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => exerciseDays.push(doc.id));
    })
    .then(setExerciseDays(exerciseDays));

    let exerciseData;
      db.doc(exerciseDay).get()
      .then((doc) => {
        if(doc.exists) {
          exerciseData = doc.data();
        }
      })
      .then(() => {
        Object.keys(exerciseData).map(key => exerciseData[key].remainingSets = exerciseData[key].Sets);
      })
      .then(() => {
        setExercise(exerciseData);
      })
  }, [exerciseDay])

  const onSubmit = (data, e) => {
    let exerciseData = {
      [data.Exercise]: {
        Sets: data.Sets,
        Reps: data.Reps,
        Weight: data.Weight
      }
    }
    db.doc(data.day).update(exerciseData);
    exerciseData[data.Exercise].remainingSets = exerciseData[data.Exercise].Sets; 
    setExercise({...exercise, ...exerciseData});
    e.target.reset();
  }

  const updateWeight = (data) => {
    return db.update({
       [data.index + '.Weight']: data.weight
    })
  }

  const completeSet = (e, index) => {
    let completedSetExercise = {...exercise};
    completedSetExercise[index].remainingSets -= 1;
    setExercise(completedSetExercise);
    e.target.style.backgroundColor = '#CD5C5C';
  }

  const completeExercise = (index) => {
    exercise[index].Completed = "true";
  }

  const removeExercise = (key) => {
    db.doc(exerciseDay).update({[key]: firebase.firestore.FieldValue.delete()})
    const exerciseState = {...exercise};
    delete exerciseState[key];
    setExercise(exerciseState);
  }

  const selectDay = (val) => {
    setExerciseDay(val);
  }

  return(
    <>
      <Navbar exerciseDaysState={exerciseDaysState} selectDay={selectDay}></Navbar>
      <ExerciseForm exerciseDaysState={exerciseDaysState} onSubmit={onSubmit} />
      {Object.keys(exercise).map(key => 
        <Exercise 
        key={key}
        index={key}
        exercise={exercise[key]}
        completeSet={completeSet}
        updateWeight={updateWeight}
        removeExercise={removeExercise}
        />
      )}
    </>
  );
}

export default App;
