import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const cartTotalCount = useSelector((state) => state.cart.totalCount);
  const token = useSelector((state) => state.ui.user.token);

  return (
    <div className={"navbar"}>
      <div className={"logo"}>
        <Link to="/">
          <div>
            <img className={"logopic"} src={"airplane.svg"} alt="" />
          </div>
        </Link>
        <div className={"logotext"}>E-Commerce</div>
      </div>

      <div className={"mainbar"}>
        <Link to={"a"}>
          <span>Sort</span>
        </Link>
        <Link to={"#"}>By</Link>
        <Link to={"/admin"}>Admin</Link>
        <Link to={"/auth"}>Auth</Link>
        {token && <Link to={"/cart"}>Cart: {cartTotalCount}</Link>}
        {token && <Link to={"/favorites"}>Favorites</Link>}
      </div>
    </div>
  );
};

export default NavBar;
