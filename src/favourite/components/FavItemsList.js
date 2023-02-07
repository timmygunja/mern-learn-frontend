import React from 'react';
// import classes from "./FavItemsList.module.css";
import FavItem from "./FavItem";

const FavItemsList = (props) => {
  return (
    <>
      {props.favItems.map((item) => {
        return (
          <FavItem
            key={item.id}
            // onClickDelete={props.onClickDelete}
            item={{
              id: item.id,
              name: item.name,
              firm: item.firm,
              price: item.price,
              image: item.image,
            }}
          />
        );
      })}
    </>
  );
};

export default FavItemsList;
