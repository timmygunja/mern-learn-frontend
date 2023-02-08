import React from "react";
import { Button, Card, TextField } from "@material-ui/core";
import { useRef } from "react";
import ImageUpload from "../../shared/components/formElements/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";
import classes from "./AddProductForm.module.css";
import env from "../../env";

const AddProductForm = () => {
  const { sendRequest } = useHttpClient();

  const nameRef = useRef("");
  const firmRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  let image;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("firm", firmRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("image", image);

      const responseData = await sendRequest(
        // "http://localhost:5000/api/products",
        env.BASE_URL + "/api/products",
        "POST",
        {},
        formData
      );

      window.alert("successful");
    } catch (err) {
      console.log(err);
    }
  };

  const fileUploadHandler = (pickedFile) => {
    image = pickedFile;
  };

  return (
    <>
      <Card>
        <form className={classes.form}>
          <TextField
            className={classes["name-input"]}
            label="Name"
            variant="outlined"
            inputRef={nameRef}
            type="text"
          />
          <TextField
            className={classes["firm-input"]}
            label="Firm"
            variant="outlined"
            inputRef={firmRef}
            type="text"
          />
          <TextField
            className={classes["description-input"]}
            label="Description"
            variant="outlined"
            inputRef={descriptionRef}
            type="text"
          />
          <TextField
            className={classes["price-input"]}
            label="Price"
            variant="outlined"
            inputRef={priceRef}
            type="number"
          />
          <ImageUpload id="image" center onInput={fileUploadHandler} />
          <Button
            className={classes["submit-button"]}
            onClick={submitHandler}
            type={"submit"}
            variant="outlined"
          >
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddProductForm;
