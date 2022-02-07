import RecommendSliderItem from "./RecommendSliderItem";
import classes from "./RecommendSliderList.module.css";

const RecommendSliderList = (props) => {

  return (
    <div
      className={classes["slider-list"]}
      style={props.style}
    >
      {props.products.map((product) => {
        return (
          <RecommendSliderItem
            key={product.id}
            id={product.id}
            name={product.name}
            firm={product.firm}
            description={product.description}
            price={product.price}
            image={product.image}
            isFavourite={product.isFavourite}
          />
        );
      })}
    </div>
  );
};

export default RecommendSliderList;
