import React from "react";
import User from "./User/User";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Users = ({setCurrentId}) => {
  const classes = useStyles();
  const users = useSelector((state) => state.users);
  
  return !users.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {users.map((user) => (
        <Grid key={user._id} item xs={12} sm={6} md={6}>
          <User user={user} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;
