import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import classes from "./MobileMenuModal.module.css";
import Card from "../../UIElements/Card";
// import BasicModal from "../../UIElements/BasicModal";
// import "./MobileMenuModal.module.css";

const screenWidth = window.innerWidth;
let width = undefined;
let padding = 3;

if (screenWidth < 700) {
  width = screenWidth - screenWidth / 3;
} else if (screenWidth < 500) {
  width = screenWidth - screenWidth / 10;
  padding = 1;
}

const MobileMenuModal = (props) => {
  const cartTotalCount = useSelector((state) => state.cart.totalCount);
  const token = useSelector((state) => state.ui.user.token);
  const user = useSelector((state) => state.ui.user.username);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes["modal"]}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <div className={classes["modal-container"]}>
        <div
          className={classes["modal-container-link"]}
          onClick={props.onClose}
        >
          <Link to={"/cart"} className={classes["link-cart"]}>
            <img src="shopping-bag.png" />
            {/* <span>{cartTotalCount}</span> */}
            <p className="hard-centered">Корзина</p>
          </Link>
        </div>

        <div
          className={classes["modal-container-link"]}
          onClick={props.onClose}
        >
          <Link to={"/favorites"} className={classes["link-favorites"]}>
            <img src="heart.png" />
            <p className="hard-centered">Избранное</p>
          </Link>
        </div>

        <div
          className={classes["modal-container-link"]}
          onClick={props.onClose}
        >
          <Link to={"/auth"} className={classes["link-auth"]}>
            <img src="user.png" />
            <p className="hard-centered">Профиль</p>
          </Link>
        </div>

        {user == "admin" && (
          <div
            className={classes["modal-container-link"]}
            onClick={props.onClose}
          >
            <Link to={"/admin"} className={classes["link-admin"]}>
              <p className="hard-centered">Админ</p>
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MobileMenuModal;
