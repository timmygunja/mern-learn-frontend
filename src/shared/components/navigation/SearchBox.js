import React from "react";
import classes from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <div class={classes["searchbox"]}>
      <form method="get" action="">
        <input type="text" placeholder="Поиск . . ." required />
        <button type="submit">
          <img src="search-glass.png" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
