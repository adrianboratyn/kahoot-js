import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../actions/users";

const Form = ({ currentId, setCurrentId }) => {
  const [userData, setUserData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    userName: "",
    mail: "",
    password: "",
  });
  const user = useSelector((state) =>
    currentId ? state.users.find((user) => user._id === currentId) : null
  );
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateUser(currentId, userData));
    } else {
      dispatch(createUser(userData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setUserData({
      userType: "",
      firstName: "",
      lastName: "",
      userName: "",
      mail: "",
      password: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edytuj" : "Dodaj"} uzytkownika
        </Typography>
        <TextField
          name="userType"
          variant="outlined"
          label="User Type"
          fullWidth
          value={userData.userType}
          onChange={(e) =>
            setUserData({ ...userData, userType: e.target.value })
          }
        />
        <TextField
          name="firstName"
          variant="outlined"
          label="First Name"
          fullWidth
          value={userData.firstName}
          onChange={(e) =>
            setUserData({ ...userData, firstName: e.target.value })
          }
        />
        <TextField
          name="lastName"
          variant="outlined"
          label="Last Name"
          fullWidth
          value={userData.lastName}
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
        />
        <TextField
          name="userName"
          variant="outlined"
          label="User Name"
          fullWidth
          value={userData.userName}
          onChange={(e) =>
            setUserData({ ...userData, userName: e.target.value })
          }
        />
        <TextField
          name="mail"
          variant="outlined"
          label="Mail"
          fullWidth
          value={userData.mail}
          onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
        />
        <TextField
          name="password"
          variant="outlined"
          label="Password"
          fullWidth
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
