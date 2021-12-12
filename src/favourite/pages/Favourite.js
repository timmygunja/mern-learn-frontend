import { useSelector } from "react-redux";
import Section from "../../shared/UIElements/Section";
import EmptyFavCard from "../components/EmptyFavCard";
import FavItem from "../components/FavItem";
import classes from "./Favourite.module.css";

const Favourite = () => {
  const favouriteItems = useSelector((state) => state.products.favourites);
  const favouritesIsEmpty =
    useSelector((state) => state.products.favourites.length) === 0;

  return (
    <Section name="favourite">
      <div className={classes.favourites}>
        {favouriteItems.map((item) => (
          <FavItem
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              firm: item.firm,
              price: item.price,
            }}
          />
        ))}
        {favouritesIsEmpty && <EmptyFavCard />}
      </div>
    </Section>
  );
};

export default Favourite;
