import Section from "../../shared/UIElements/Section";
import classes from "./Auth.module.css";
import TextField from "@material-ui/core/TextField";
import Card from "../../shared/UIElements/Card";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useRef } from "react";
import { InputAdornment } from "@material-ui/core";
import { uiActions } from "../../store/ui-slice";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector((state) => state.ui.isLogged);

  const loginRef = useRef("");
  const passwordRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      uiActions.login({
        user: {
          login: loginRef.current.value,
          password: passwordRef.current.value,
        },
      })
    );

    console.log(isLogged);
    // history.push("/");
  };

  return (
    <Section name={"auth"}>
      <div className={"hard-centered"}>
        <Card>
          <form className={classes.form}>
            {/* <div className={classes["login-logo"]}>
              <AccountCircle />
            </div> */}
            <TextField
              className={classes["login-input"]}
              label="Login"
              variant="outlined"
              inputRef={loginRef}
            />
            <TextField
              className={classes["password-input"]}
              label="Password"
              variant="outlined"
              inputRef={passwordRef}
            />
            <Button
              className={classes["submit-button"]}
              onClick={submitHandler}
              type={"submit"}
              variant="outlined"
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
};

export default Auth;
