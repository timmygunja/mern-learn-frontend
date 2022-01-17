// import classes from "./FavItemsList.module.css";
import FavItem from "./FavItem";

const FavItemsList = (props) => {
  return (
    <>
      {props.favItems.map((item) => {
        return (
          <FavItem
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              firm: item.firm,
              price: item.price,
            }}
          />
        );
      })}
    </>
  );
};

export default FavItemsList;
