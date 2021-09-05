import { useSelector } from "react-redux";
import Section from "../../shared/UIElements/Section";
import FavItem from "../components/FavItem";
import classes from "./Favourite.module.css";

const Favourite = () => {
  const favouriteItems = useSelector((state) => state.products.favourites);

  return (
    <Section name="favourite">
      <div className={classes.favourites}>
        {favouriteItems.map((item) => (
          <FavItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              firm: item.firm,
              price: item.price,
            }}
          />
        ))}
      </div>
    </Section>
  );
};

export default Favourite;
