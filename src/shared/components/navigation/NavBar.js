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
          <div>
            <img className={"logopic"} src={"airplane.svg"} alt="" />
          </div>

          <div className={"logotext"}>E-Commerce</div>
        </div>
      </Link>

      <div className={mainbarClass}>
        <Link to={"a"}>
          <span>Sort</span>
        </Link>
        <Link to={"#"}>By</Link>
        {token && <Link to={"/cart"}>Cart: {cartTotalCount}</Link>}
        {token && <Link to={"/favorites"}>Favorites</Link>}
        {user == "admin" && <Link to={"/admin"}>Admin</Link>}
        <Link to={"/auth"}>Auth</Link>
      </div>

      <div className="mainbar-mobile">
        <div className={menuClass} onClick={menuHandler}>
          <img src={"menu-mobile.svg"} alt="" />
        </div>
        <div className={menuContentClass}>
          <ul onClick={closeMenuHandler}>
            <li>
              <Link to={"a"}>
                <span>Sort</span>
              </Link>
            </li>
            <li>
              <Link to={"#"}>By</Link>
            </li>
            {token && (
              <li>
                <Link to={"/cart"}>Cart: {cartTotalCount}</Link>
              </li>
            )}
            {token && (
              <li>
                <Link to={"/favorites"}>Favorites</Link>
              </li>
            )}
            {user == "admin" && (
              <li>
                <Link to={"/admin"}>Admin</Link>
              </li>
            )}
            <li>
              <Link to={"/auth"}>Auth</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
