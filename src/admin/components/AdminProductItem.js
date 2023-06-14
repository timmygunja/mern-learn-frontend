import React, { useState } from "react";
import classes from "./AdminProductItem.module.css";
import { Link } from "react-router-dom";
import env from "../../env";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { useHttpClient } from "../../shared/hooks/http-hook";
import EditModal from "./EditModal";

const AdminProductItem = (props) => {
  const { sendRequest } = useHttpClient();
  const {
    id,
    name,
    firm,
    price,
    image,
    viewedCount,
    likedCount,
    purchasedCount,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  const editHandler = () => {
    setModalOpen(true);
  };

  const deleteHandler = async () => {
    try {
      const responseData = await sendRequest(
        env.BASE_URL + `/api/products/${id}`,
        "DELETE"
      );
    } catch (err) {}

    window.alert("successful");
  };

  return (
    <>
      <div className={classes.product}>
        <Link
          to={`/products/${id}`}
          className={classes["prod-pic"] + " hard-centered"}
        >
          <img src={env.BASE_URL + `/${image}`} alt="" />
        </Link>
        <div className={classes["prod-content"]}>
          <p className={classes["prod-name"]}>{name}</p>
          <p className={classes["prod-firm"]}>{firm}</p>
          <p className={classes["prod-price"]}>{price} ₽</p>
          <p className={classes["prod-viewed"]}>Просмотрено: {viewedCount}</p>
          <p className={classes["prod-liked"]}>В избранных: {likedCount}</p>
          <p className={classes["prod-purchased"]}>
            В корзине: {purchasedCount}
          </p>
          <div className={classes["btn-edit"]}>
            <EditButton onClick={editHandler}>Редактировать</EditButton>
            <EditModal open={modalOpen} onClose={handleClose} product={props} />
          </div>
          <div className={classes["btn-delete"]}>
            <DeleteButton onClick={deleteHandler}>Удалить</DeleteButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductItem;
