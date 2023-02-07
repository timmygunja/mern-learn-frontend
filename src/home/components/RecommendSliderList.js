import React from 'react';
import RecommendSliderItem from "./RecommendSliderItem";
import classes from "./RecommendSliderList.module.css";

let isFavorite;

const RecommendSliderList = (props) => {
  return (
    <div className={classes["slider-list"]} style={props.style}>
      {props.products.map((product) => {
        if (props.favorites) {
          isFavorite = props.favorites.includes(product.id);
        }

        return (
          <RecommendSliderItem
            key={product.id}
            id={product.id}
            name={product.name}
            firm={product.firm}
            description={product.description}
            price={product.price}
            image={product.image}
            isFavorite={isFavorite}
          />
        );
      })}
    </div>
  );
};

export default RecommendSliderList;
