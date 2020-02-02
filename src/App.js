import React, {useState, useEffect} from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import NavigationBar from './NavigationBar';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

const App = () => {
  const [exercise, setExercise] = useState({});
  const [exerciseDaysState, setExerciseDays] = useState({});
  const [exerciseDay, setExerciseDay] = useState("");
  const [exerciseFormState, setExerciseFormState] = useState(false);
  
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
    db.doc(exerciseDay).update({
      [data.index + ".Weight"] : data.weight
    })
  }

  const updateExerciseFormState = () => {
    setExerciseFormState(!exerciseFormState);
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

  let exerciseForm;
  if(exerciseFormState)
    exerciseForm = <CSSTransition
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <ExerciseForm exerciseDaysState={exerciseDaysState} onSubmit={onSubmit} />
      </CSSTransition> ;


  return(
    <>
      <NavigationBar exerciseDaysState={exerciseDaysState} updateExerciseFormState={updateExerciseFormState} selectDay={selectDay}></NavigationBar>
      <CSSTransition
        in={exerciseFormState}
        timeout={{enter: 3000, exit: 3000}}
        classNames="exerciseForm"
        unmountOnExit
      >
        <ExerciseForm exerciseDaysState={exerciseDaysState} onSubmit={onSubmit} />
      </CSSTransition> 
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
