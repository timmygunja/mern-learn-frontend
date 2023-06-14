import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const cartTotalCount = useSelector((state) => state.cart.totalCount);
  const token = useSelector((state) => state.ui.user.token);

  const telegramLink = "";
  const WhatsLink = "";
  const instaLink = "";

  const redirectToTg = () => {
    // window.location.assign(telegramLink);
  };

  const redirectToWhats = () => {
    // window.location.assign(WhatsLink);
  };

  const redirectToInsta = () => {
    // window.location.assign(instaLink);
  };

  return (
    <div className={classes["footer"]}>
      <div className={classes["top-content"]}>
        <div className={classes["flex-box"]}>
          <div className={classes["help"]}>
            <Link className={classes["title"]}>Помощь</Link>
            <Link className={classes["top-content-link"]}>Статус заказа</Link>
            <Link className={classes["top-content-link"]}>Доставка</Link>
            <Link className={classes["top-content-link"]}>Возврат</Link>
            <Link className={classes["top-content-link"]}>Методы оплаты</Link>
            <Link className={classes["top-content-link"]}>Задать вопрос</Link>
          </div>
        </div>
        <div className={classes["flex-box"]}>
          <div className={classes["about"]}>
            <Link className={classes["title"]}>О компании</Link>
            <Link className={classes["top-content-link"]}>Новости</Link>
            <Link className={classes["top-content-link"]}>Карьера</Link>
            <Link className={classes["top-content-link"]}>Информация</Link>
            <Link className={classes["top-content-link"]}>Спонсоры</Link>
          </div>
        </div>
      </div>
      <div className={classes["bottom-content"]}>
        <div className={classes["location"]}>
          <svg height="12px" width="12px" fill="white" viewBox="0 0 42 58">
            <path d="M21 0C9.4 0 0 9.5 0 21.2 0 39.9 21 58 21 58s21-18.1 21-36.8C42 9.5 32.6 0 21 0zm0 31c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"></path>
          </svg>
          <h4>Россия</h4>
          {/* <h4>E-shop inc., No rights reserved.</h4> */}
        </div>

        <div className={classes["socials"]}>
          <div className={classes["social-test"]}>
            <div className={classes["hard-centered"]} onClick={redirectToWhats}>
              <i className="fa fa-whatsapp" aria-hidden="true"></i>
            </div>
            <div className={classes["hard-centered"]} onClick={redirectToTg}>
              <i className="fa fa-telegram" aria-hidden="true"></i>
            </div>
            <div className={classes["hard-centered"]} onClick={redirectToInsta}>
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <div className={classes["info"]}>
          <Link className={classes["bottom-content-link"]}>Каталог</Link>
          <Link className={classes["bottom-content-link"]}>Правила пользования</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
