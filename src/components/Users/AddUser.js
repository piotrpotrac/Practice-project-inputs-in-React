import React, { useState, useRef } from "react";

import Card from "../UI/Card.js";
import Button from "../UI/Button.js";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModule.js";
import Wraper from "../Helpers/Wraper.js";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter avalid name and age (non-empty values).",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      // + convert string into intiger

      setError({
        title: "Invalid age",
        message: "Please enter avalid age (> 0).",
      });
      return;
    }

    // if (enteredUsername.trim().length > 0 && enteredAge.trim().length > 0) {
    //   console.log(enteredUsername, enteredAge);

    //   setEnteredUsername("");
    //   setEnteredAge("");
    //   // return;
    // }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wraper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wraper>
  );
};

export default AddUser;
