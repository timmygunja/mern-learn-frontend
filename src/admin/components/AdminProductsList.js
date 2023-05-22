import React from "react";
import classes from "./AdminProductsList.module.css";
import AdminProductItem from "./AdminProductItem";

let isFavorite;

const AdminProductsList = (props) => {
  return (
    <div className={classes.maingrid}>
      {props.products.map((product) => {
        return (
          <AdminProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            firm={product.firm}
            description={product.description}
            price={product.price}
            image={product.image}
            viewedCount={product.viewedCount}
            likedCount={product.likedCount}
            purchasedCount={product.purchasedCount}
          />
        );
      })}
    </div>
  );
};

export default AdminProductsList;
