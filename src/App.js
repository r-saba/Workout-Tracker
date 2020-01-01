import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import firebase from './firebase';
import './style.scss';

const App = () => {
  const [exercise, setExercise] = useState([]);
  let db = firebase.firestore();

  useEffect(() => {
    let exerciseData = [];
    db
      .collection('exercise')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let storedExercise = doc.data();
          storedExercise['id'] = doc.id;
          storedExercise['remainingSets'] = storedExercise['Sets'];
          exerciseData.push(storedExercise);
        })
    })
      .then(() => setExercise(exerciseData));
  }, [])

  const onSubmit = (data, e) => {
    db.collection("exercise").add({
      Exercise: data.Exercise,
      Sets: data.Sets,
      Reps: data.Reps,
      Weight: data.Weight
    })
    data.remainingSets = data.Sets;
    setExercise([...exercise, data]);
    e.target.reset();
  }

  const updateWeight = (data) => {
    console.log(exercise[data.index]);
    let exerciseToUpdate = db.collection("exercise").doc(exercise[data.index].id);
    return exerciseToUpdate.update({
      Weight: data.weight
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

  return(
    <>
      <ExerciseForm onSubmit={onSubmit} />
      {Object.keys(exercise).map(key => <Exercise 
        key={key}
        index={key}
        exercise={exercise[key]}
        updateWeight={updateWeight}
        completedSet={completedSet}
        completeExercise={completeExercise}
        removeExercise={removeExercise}
      />)}
    </>);
}

export default App;
