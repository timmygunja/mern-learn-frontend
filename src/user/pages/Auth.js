import Section from "../../shared/UIElements/Section";
import classes from "./Auth.module.css";
import TextField from "@material-ui/core/TextField";
import Card from "../../shared/UIElements/Card";
import Button from "@material-ui/core/Button";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import { useRef, useState } from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner"

const Auth = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.ui.isLogged);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    if (!isLogged) {
    }

    dispatch(
      uiActions.login({
        user: {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
      })
    );
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (!isLogged) {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false)
    }

    // dispatch(
    //   uiActions.login({
    //     user: {
    //       username: usernameRef.current.value,
    //       password: passwordRef.current.value,
    //     },
    //   })
    // );
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <Section name={"Log in"}>
        <div className={"hard-centered"}>
          <Card>
            <form className={classes.form}>
              {/* <div className={classes["username-logo"]}>
                <AccountCircle />
              </div> */}
              <TextField
                className={classes["username-input"]}
                label="Username"
                variant="outlined"
                inputRef={usernameRef}
              />
              <TextField
                className={classes["password-input"]}
                label="Password"
                variant="outlined"
                inputRef={passwordRef}
              />
              <Button
                className={classes["submit-button"]}
                onClick={submitLoginHandler}
                type={"submit"}
                variant="outlined"
              >
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </Section>

      <Section name={"Register"}>
        <div className={"hard-centered"}>
          <Card>
            <form className={classes.form}>
              {/* <div className={classes["username-logo"]}>
            <AccountCircle />
          </div> */}
              <TextField
                className={classes["username-input"]}
                label="Username"
                variant="outlined"
                inputRef={usernameRef}
              />
              <TextField
                className={classes["password-input"]}
                label="Password"
                variant="outlined"
                inputRef={passwordRef}
              />
              <Button
                className={classes["submit-button"]}
                onClick={submitRegisterHandler}
                type={"submit"}
                variant="outlined"
              >
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Auth;
