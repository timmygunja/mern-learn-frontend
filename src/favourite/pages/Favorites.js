import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Section from "../../shared/UIElements/Section";
import EmptyFavCard from "../components/EmptyFavCard";
import classes from "./Favorites.module.css";
import FavItemsList from "../components/FavItemsList";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";

const Favorites = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  const [loadedFavItems, setLoadedFavItems] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/favorites",
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );
        setLoadedFavItems(responseData.favItems);
      } catch (error) {}
    };
    loadFavorites();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}

      <Section name="Favorites">
        <div className={classes.favorites}>
          {loadedFavItems && loadedFavItems.length === 0 && <EmptyFavCard />}
          {loadedFavItems && <FavItemsList favItems={loadedFavItems} />}
        </div>
      </Section>
    </>
  );
};

export default Favorites;
