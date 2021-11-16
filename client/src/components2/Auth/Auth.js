import React, { useState } from "react";
import styles from "./auth.module.css";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { InputAdornment, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
//import Input from "./AuthInput/AuthInput";
import { login, register } from "../../actions/auth";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const initialState = {
  userType: "",
  firstName: "",
  lastName: "",
  userName: "",
  mail: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(register(formData, history));
    } else {
      dispatch(login(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.form__title}>{isSignup ? "Sign up" : "Sign in"}</h1>
      <p className={styles.form_description}>
        Get unlimited access to the latest design trends
      </p>
      {isSignup && (
        <>
          <div className={styles.form__group}>
            <input
              type="text"
              id="firstName"
              className={styles.form__input}
              onChange={handleChange}
              placeholder=" "
              autocomplete="off"
            />
            <label for="firstName" className={styles.form__label}>
              First Name
            </label>
          </div>
          <div className={styles.form__group}>
            <input
              type="text"
              id="lastName"
              className={styles.form__input}
              onChange={handleChange}
              placeholder=" "
              autocomplete="off"
            />
            <label for="lastName" className={styles.form__label}>
              Last Name
            </label>
          </div>
          <div className={styles.form__group}>
            <input
              type="text"
              id="email"
              className={styles.form__input}
              onChange={handleChange}
              placeholder=" "
              autocomplete="off"
            />
            <label for="email" className={styles.form__label}>
              Email
            </label>
          </div>
          <div className={styles["form__group-select"]}>
            <label for="userType" className={styles.form__label}>
              Account type
            </label>
            <select name="" id="" onChange={handleChange}>
              <option selected disabled value="0">
                Select account type
              </option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
        </>
      )}
      <div className={styles.form__group}>
        <input
          type="text"
          id="userName"
          className={styles.form__input}
          onChange={handleChange}
          placeholder=" "
          autocomplete="off"
        />
        <label for="userName" className={styles.form__label}>
          User Name
        </label>
      </div>

      <div className={styles.form__group}>
        <input
          type="password"
          id="password"
          className={styles.form__input}
          onChange={handleChange}
          placeholder=" "
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton onClick={handleShowPassword}>
          //         {showPassword ? <Visibility /> : <VisibilityOff />}
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
        <label for="password" className={styles.form__label}>
          Password
        </label>
      </div>
      {isSignup && (
        <div className={styles.form__group}>
          <input
            type="password"
            id="confirmPassword"
            className={styles.form__input}
            onChange={handleChange}
            placeholder=" "
          />
          <label for="confirmPassword" className={styles.form__label}>
            Repeat password
          </label>
        </div>
      )}

      <button className={styles.form__button}>
        {isSignup ? "Sign Up" : "Sign In"}
      </button>
      <button onClick={switchMode}>
        {isSignup
          ? "Already have an account? Sign in"
          : "Don't have an account? Sign Up"}
      </button>
    </form>
  );
}

export default Auth;
