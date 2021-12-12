import Section from "../../shared/UIElements/Section";
import classes from "./Auth.module.css";
import TextField from "@material-ui/core/TextField";
import Card from "../../shared/UIElements/Card";
import Button from "@material-ui/core/Button";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import { useRef, useState } from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector((state) => state.ui.isLogged);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.ui.user);

  const registerUsernameRef = useRef("");
  const registerPasswordRef = useRef("");
  const loginUsernameRef = useRef("");
  const loginPasswordRef = useRef("");

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsernameRef.current.value,
          password: loginPasswordRef.current.value,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(
        uiActions.login({
          user: {
            username: loginUsernameRef.current.value,
            password: loginPasswordRef.current.value,
          },
        })
      );
      history.push("/")
    } catch (error) {
      setError(error.message || "Something went wrong, please try again");
    }

    setIsLoading(false);
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsernameRef.current.value,
          password: registerPasswordRef.current.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(
        uiActions.login({
          user: {
            username: registerUsernameRef.current.value,
            password: registerPasswordRef.current.value,
          },
        })
      );
      history.push("/")
    } catch (error) {
      setError(error.message || "Something went wrong, please try again");
    }

    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  const logoutHandler = () => {
    dispatch(uiActions.logout());
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={errorHandler} />}

      <Section name={"Log in"}>
        <div className={"hard-centered"}>
          <Card>
            {isLogged && (
              <div className={classes["logged-centered"]}>
                <p>You are logged in, {user.username}</p>
                <Button
                  className={classes["logout-button"]}
                  onClick={logoutHandler}
                  variant="outlined"
                >
                  Log out
                </Button>
              </div>
            )}

            {!isLogged && (
              <form className={classes.form}>
                {/* <div className={classes["username-logo"]}>
                <AccountCircle />
              </div> */}
                <TextField
                  className={classes["username-input"]}
                  label="Username"
                  variant="outlined"
                  inputRef={loginUsernameRef}
                />
                <TextField
                  className={classes["password-input"]}
                  label="Password"
                  variant="outlined"
                  inputRef={loginPasswordRef}
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
            )}
          </Card>
        </div>
      </Section>

      {!isLogged && (
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
                  inputRef={registerUsernameRef}
                />
                <TextField
                  className={classes["password-input"]}
                  label="Password"
                  variant="outlined"
                  inputRef={registerPasswordRef}
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
      )}
    </>
  );
};

export default Auth;
