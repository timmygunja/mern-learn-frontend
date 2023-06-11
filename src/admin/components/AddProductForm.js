import React from "react";
import { Button, Card, TextField } from "@material-ui/core";
import { useRef } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import classes from "./AddProductForm.module.css";
import env from "../../env";
import { useSelector } from "react-redux";
import ImageUpload from "../../shared/components/formElements/ImageUpload";

const AddProductForm = () => {
  const { sendRequest } = useHttpClient();

  const user = useSelector((state) => state.ui.user);

  const nameRef = useRef("");
  const firmRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  let image;
  let image2;
  let image3;
  let image4;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("firm", firmRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("price", priceRef.current.value);
      // formData.append("image", image);
      // formData.append("image2", image2);

      formData.append("image", image);
      formData.append("image", image2);
      formData.append("image", image3);
      formData.append("image", image4);

      const responseData = await sendRequest(
        // "http://localhost:5000/api/products",
        env.BASE_URL + "/api/products",
        "POST",
        {
          Authorization: "Bearer " + user.token,
          Username: user.username,
        },
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

  const fileUploadHandler2 = (pickedFile) => {
    image2 = pickedFile;
  };

  const fileUploadHandler3 = (pickedFile) => {
    image3 = pickedFile;
  };

  const fileUploadHandler4 = (pickedFile) => {
    image4 = pickedFile;
  };

  return (
    <>
      <Card>
        <form className={classes.form}>
          <TextField
            className={classes["name-input"]}
            label="Название"
            variant="outlined"
            inputRef={nameRef}
            type="text"
          />
          <TextField
            className={classes["firm-input"]}
            label="Фирма"
            variant="outlined"
            inputRef={firmRef}
            type="text"
          />
          <TextField
            className={classes["description-input"]}
            label="Описание"
            variant="outlined"
            inputRef={descriptionRef}
            type="text"
          />
          <TextField
            className={classes["price-input"]}
            label="Цена"
            variant="outlined"
            inputRef={priceRef}
            type="number"
          />
          {/* <ImageUpload id="image" center onInput={fileUploadHandler} /> */}
          <ImageUpload id="image" center onInput={fileUploadHandler} />
          <ImageUpload id="image" center onInput={fileUploadHandler2} />
          <ImageUpload id="image" center onInput={fileUploadHandler3} />
          <ImageUpload id="image" center onInput={fileUploadHandler4} />
          <Button
            className={classes["submit-button"]}
            onClick={submitHandler}
            type={"submit"}
            variant="outlined"
          >
            Подтвердить
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddProductForm;
