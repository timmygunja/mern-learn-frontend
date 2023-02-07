import React from 'react';
import Section from "../../shared/UIElements/Section";
import AddProductForm from "./AddProductForm";
import classes from "./Admin.module.css";

const Admin = () => {
  return (
    <div className={classes.admin}>
      <div className={classes["section-stats"]}>
        <Section name="Statistics">
          <h3 className="hard-centered">Place for some statistics</h3>
        </Section>
      </div>

      <div className={classes["section-add-form"]}>
        <Section name="Add Product">
          <AddProductForm />
        </Section>
      </div>
    </div>
  );
};

export default Admin;
