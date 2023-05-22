import React, { useEffect } from "react";
import Section from "../../shared/UIElements/Section";
import AddProductForm from "../components/AddProductForm";
import classes from "./Admin.module.css";
import AdminProductsList from "../components/AdminProductsList";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { loadProducts } from "../../store/products-slice";

const Admin = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const loadedProducts = useSelector((state) => state.products.loadedProducts);

  useEffect(() => {
    dispatch(loadProducts(sendRequest));
  }, []);

  return (
    <div className={classes.admin}>
      <div className={classes["section-stats"]}>
        <Section name="Товары">
          {/* <h3 className="hard-centered">Место статистики</h3> */}
          {loadedProducts && <AdminProductsList products={loadedProducts} />}
        </Section>
      </div>

      <div className={classes["section-add-form"]}>
        <Section name="Добавить товар">
          <AddProductForm />
        </Section>
      </div>
    </div>
  );
};

export default Admin;
