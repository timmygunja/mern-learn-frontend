import React, { useState } from "react";
import classes from "./Form.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHttpClient } from "../../shared/hooks/http-hook";
import env from "../../env";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const [formClass, setFormClass] = useState("");

  const formClassHandler = () => {
    formClass == classes["active"]
      ? setFormClass("")
      : setFormClass(classes["active"]);
  };

  const user = useSelector((state) => state.ui.user);

  const registerUsernameRef = useRef("");
  const registerPasswordRef = useRef("");
  const loginUsernameRef = useRef("");
  const loginPasswordRef = useRef("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        // "http://localhost:5000/api/users/login",
        env.BASE_URL + "/api/users/login",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          username: loginUsernameRef.current.value,
          password: loginPasswordRef.current.value,
        })
      );

      dispatch(
        uiActions.login({
          user: {
            id: responseData.userId,
            username: responseData.username,
            token: responseData.token,
          },
        })
      );

      history.push("/");
    } catch (error) {}
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        // "http://localhost:5000/api/users/signup",
        env.BASE_URL + "/api/users/signup",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          username: registerUsernameRef.current.value,
          password: registerPasswordRef.current.value,
        })
      );

      dispatch(
        uiActions.login({
          user: {
            id: responseData.userId,
            username: responseData.username,
            token: responseData.token,
          },
        })
      );

      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      <div className={classes["container"] + " " + formClass} id="container">
        <div className={classes["form-container"] + " " + classes["sign-up"]}>
          <form>
            <h1>Создать профиль</h1>
            <div className={classes["social-icons"]}>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-google" />
              </a>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-facebook" />
              </a>
              <a href="" className={classes["icon"]}>
                <i className="fa fa-github" />
              </a>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-linkedin" />
              </a>
            </div>
            <span>или используйте email для регистрации</span>
            <TextField
              label="Email"
              variant="outlined"
              inputRef={registerUsernameRef}
              size="small"
              // type="email"
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              inputRef={registerPasswordRef}
              size="small"
              type="password"
            />
            <Button
              onClick={registerHandler}
              type={"submit"}
              variant="outlined"
            >
              Регистрация
            </Button>
          </form>
        </div>
        <div className={classes["form-container"] + " " + classes["sign-in"]}>
          <form>
            <h1>Вход</h1>
            <div className={classes["social-icons"]}>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-google" />
              </a>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-facebook" />
              </a>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-github" />
              </a>
              <a href="#" className={classes["icon"]}>
                <i className="fa fa-linkedin" />
              </a>
            </div>
            <span>или используйте пароль email</span>
            <TextField
              label="Email"
              variant="outlined"
              inputRef={loginUsernameRef}
              size="small"
              // type="email"
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              inputRef={loginPasswordRef}
              size="small"
              type="password"
            />
            <a href="#">Восстановить пароль</a>
            <Button
              onClick={loginHandler}
              type={"submit"}
              variant="outlined"
              margin="normal"
            >
              Войти
            </Button>
          </form>
        </div>
        <div className={classes["toggle-container"]}>
          <div className={classes["toggle"]}>
            <div
              className={classes["toggle-panel"] + " " + classes["toggle-left"]}
            >
              <h1>Добро пожаловать!</h1>
              <p>Введите свои данные для входа</p>
              <Button
                onClick={formClassHandler}
                variant="outlined"
                className={classes["hidden"]}
              >
                Войти
              </Button>
            </div>
            <div
              className={
                classes["toggle-panel"] + " " + classes["toggle-right"]
              }
            >
              <h1>Здравствуйте!</h1>
              <p>Зарегистрируйтесь для полного доступа</p>
              <Button
                onClick={formClassHandler}
                variant="outlined"
                className={classes["hidden"]}
              >
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
