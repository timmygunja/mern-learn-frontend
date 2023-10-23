import React from "react";
import Section from "../../shared/UIElements/Section";
import classes from "./Auth.module.css";
import TextField from "@material-ui/core/TextField";
import Card from "../../shared/UIElements/Card";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { loadProducts } from "../../store/products-slice";
import { favoritesActions } from "../../store/favorites-slice";
import env from "../../env";
import Form from "../components/Form";

const Auth = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.ui.isLogged);
  const { sendRequest } = useHttpClient();

  const user = useSelector((state) => state.ui.user);
  const username = unescape(encodeURIComponent(user.username));

  const logoutHandler = async () => {
    dispatch(uiActions.logout());
    dispatch(favoritesActions.setloadedFavoritesIds([]));
    await dispatch(loadProducts(sendRequest));
  };

  return (
    <>
      <Section className={"auth-section"} name={"Авторизация"}>
        {!isLogged && (
          <div className={classes["auth-container"]}>
            <Form />
          </div>
        )}

        {isLogged && (
          <Card>
            <div className={classes["logged-centered"]}>
              <div className="hard-centered">
                <img className={classes["userlogo"]} src="/user.png"></img>
              </div>
              <p>Вы авторизованы как: {username}</p>
              <Button
                className={classes["logout-button"]}
                onClick={logoutHandler}
                variant="outlined"
              >
                Выйти
              </Button>
            </div>
          </Card>
        )}
      </Section>
    </>
  );
};

export default Auth;
