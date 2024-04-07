import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Section from "../../shared/UIElements/Section";
import EmptyFavCard from "../components/EmptyFavCard";
import classes from "./Favorites.module.css";
import FavItemsList from "../components/FavItemsList";
import { favoritesActions, loadFavorites } from "../../store/favorites-slice";

const Favorites = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  // const [loadedFavItems, setLoadedFavItems] = useState(null);
  const favoritesChanged = useSelector((state) => state.favorites.changed);
  const loadedFavorites = useSelector(
    (state) => state.favorites.loadedFavorites
  );

  // useEffect(() => {
  // const loadFavoritesIds = async () => {
  //   try {
  //     const responseData = await sendRequest(
  //       "http://localhost:5000/api/favorites",
  //       "GET",
  //       {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + user.token,
  //         Username: user.username,
  //       }
  //     );
  //     setLoadedFavItems(responseData.favItems);
  //   } catch (error) {}
  // };
  //   loadFavoritesIds();
  // }, [sendRequest]);

  useEffect(async () => {
    if (user.isLogged) {
      await dispatch(loadFavorites(sendRequest, user));
      await dispatch(favoritesActions.setFavoritesChanged(false));
    }
  }, [favoritesChanged]);

  // const deleteItemHandler = (itemId) => {
  //   setLoadedFavItems((prevItems) =>
  //     prevItems.filter((item) => item.id !== itemId)
  //   );
  // };

  return (
    <>
      <Section name="Избранное">
        <div className={classes.favorites}>
          {loadedFavorites && loadedFavorites.length === 0 && <EmptyFavCard />}
          {loadedFavorites && (
            <FavItemsList
              favItems={loadedFavorites}
              // onClickDelete={deleteItemHandler}
            />
          )}
        </div>
      </Section>
    </>
  );
};

export default Favorites;
