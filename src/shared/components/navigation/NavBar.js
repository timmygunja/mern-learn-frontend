import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const NavBar = () => {
  const cartTotalCount = useSelector((state) => state.cart.totalCount);
  const token = useSelector((state) => state.ui.user.token);
  const user = useSelector((state) => state.ui.user.username);
  const [menuClass, setMenuClass] = useState("menu");
  const [menuContentClass, setMenuContentClass] = useState("menu-content");

  const menuHandler = () => {
    menuClass == "menu" ? setMenuClass("menu-open") : setMenuClass("menu");
    menuContentClass == "menu-content"
      ? setMenuContentClass("menu-content-active")
      : setMenuContentClass("menu-content");
  };

  const closeMenuHandler = () => {
    setMenuClass("menu");
    setMenuContentClass("menu-content");
  };

  let mainbarClass = "mainbar";
  if (token) {
    mainbarClass += " logged";
  }
  if (user == "admin") {
    mainbarClass += " admin";
  }

  return (
    <div className={"navbar"}>
      <Link to="/">
        <div className={"logo"}>
          <div className={"logopic hard-centered"}>
            {/* <img src={"airplane.svg"} alt="" /> */}
            <img src={"logo.png"} alt="" />
          </div>

          <div className={"logotext"}>
            <p>Планета</p>
            <p>напитков</p> 
          </div>
        </div>
      </Link>

      <div className={mainbarClass}>
        <Link to={"#"}>
          <span>Сортировать</span>
        </Link>
        <Link to={"#"}>По</Link>
        {token && <Link to={"/cart"}>Корзина: {cartTotalCount}</Link>}
        {token && <Link to={"/favorites"}>Избранное</Link>}
        {user == "admin" && <Link to={"/admin"}>Админ</Link>}
        <Link to={"/auth"}>Авторизация</Link>
      </div>

      <div className="mainbar-mobile">
        <div className={menuClass} onClick={menuHandler}>
          <img src={"menu-mobile.svg"} alt="" />
        </div>
        <div className={menuContentClass}>
          <ul onClick={closeMenuHandler}>
            <li>
              <Link to={"#"}>
                <span>Сортировать</span>
              </Link>
            </li>
            <li>
              <Link to={"#"}>По</Link>
            </li>
            {token && (
              <li>
                <Link to={"/cart"}>Корзина: {cartTotalCount}</Link>
              </li>
            )}
            {token && (
              <li>
                <Link to={"/favorites"}>Избранное</Link>
              </li>
            )}
            {user == "admin" && (
              <li>
                <Link to={"/admin"}>Админ</Link>
              </li>
            )}
            <li>
              <Link to={"/auth"}>Авторизация</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
