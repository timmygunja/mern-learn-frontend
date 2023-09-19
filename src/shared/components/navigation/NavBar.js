import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchBox from "./SearchBox";

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
      <Link to="/" className="hard-centered">
        <div className={"logo"}>
          <div className={"logopic hard-centered"}>
            <img src={"logo.png"} alt="" />
          </div>

          <div className={"logotext hard-centered"}>
            <div>
              <p>Планета</p>
              <p>напитков</p>
            </div>
            <p></p>
          </div>
        </div>
      </Link>

      <div className={mainbarClass}>
        {/* <SearchBox /> */}
        <Link to={token ? "/cart" : "/auth"} className="cart hard-centered">
          {/* Корзина: {cartTotalCount} */}
          <img src="shopping-bag.png" />
          <span>{cartTotalCount}</span>
        </Link>
        <Link
          to={token ? "/favorites" : "/auth"}
          className="favorites hard-centered"
        >
          {/* Избранное */}
          <img src="heart.png" />
        </Link>
        {user == "admin" && (
          <Link to={"/admin"} className="admin hard-centered">
            Админ
          </Link>
        )}
        <Link to={"/auth"} className="auth hard-centered">
          {/* Авторизация */}
          <img src="user.png" />
        </Link>
      </div>

      <div className="mainbar-mobile">
        <div className={menuClass} onClick={menuHandler}>
          <img src={"menu-mobile.svg"} alt="" />
        </div>
        <div className={menuContentClass}>
          <ul onClick={closeMenuHandler}>
            <li>
              <Link to={token ? "/cart" : "/auth"}>
                Корзина: {cartTotalCount}
              </Link>
            </li>
            <li>
              <Link to={token ? "/favorites" : "/auth"}>Избранное</Link>
            </li>
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
