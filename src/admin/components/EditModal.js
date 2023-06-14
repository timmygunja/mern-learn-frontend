import React, { useRef, useState } from "react";
import BasicModal from "../../shared/UIElements/BasicModal";
import classes from "./EditModal.module.css";
import { Button, TextField } from "@material-ui/core";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector } from "react-redux";
import ImageUpload from "../../shared/components/formElements/ImageUpload";
import env from "../../env";

const EditModal = (props) => {
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  const {
    id,
    name,
    firm,
    description,
    price,
    image,
    image2,
    image3,
    image4,
  } = props.product;

  const nameRef = useRef(name);
  const firmRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  let newImage;
  let newImage2;
  let newImage3;
  let newImage4;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("firm", firmRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("image", newImage);
      formData.append("image2", newImage2);
      formData.append("image3", newImage3);
      formData.append("image4", newImage4);

      const responseData = await sendRequest(
        env.BASE_URL + `/api/products/${id}`,
        "PATCH",
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
    props.onClose();
  };

  const fileUploadHandler = (pickedFile) => {
    newImage = pickedFile;
  };

  const fileUploadHandler2 = (pickedFile) => {
    newImage2 = pickedFile;
  };

  const fileUploadHandler3 = (pickedFile) => {
    newImage3 = pickedFile;
  };

  const fileUploadHandler4 = (pickedFile) => {
    newImage4 = pickedFile;
  };

  return (
    <BasicModal open={props.open} handleClose={props.onClose}>
      <form className={classes.form}>
        <TextField
          className={classes["name-input"]}
          label="Название"
          variant="outlined"
          inputRef={nameRef}
          type="text"
          defaultValue={name}
        />
        <TextField
          className={classes["firm-input"]}
          label="Фирма"
          variant="outlined"
          inputRef={firmRef}
          type="text"
          defaultValue={firm}
        />
        <TextField
          className={classes["description-input"]}
          label="Описание"
          variant="outlined"
          inputRef={descriptionRef}
          type="text"
          defaultValue={description}
        />
        <TextField
          className={classes["price-input"]}
          label="Цена"
          variant="outlined"
          inputRef={priceRef}
          type="number"
          defaultValue={price}
        />
        <ImageUpload
          id="image"
          className={[classes["image"]]}
          center
          onInput={fileUploadHandler}
          image={image}
        />
        <ImageUpload
          id="image"
          className={[classes["image2"]]}
          center
          onInput={fileUploadHandler2}
        />
        <ImageUpload
          id="image"
          className={[classes["image3"]]}
          center
          onInput={fileUploadHandler3}
        />
        <ImageUpload
          id="image"
          className={[classes["image4"]]}
          center
          onInput={fileUploadHandler4}
        />
        <Button
          className={classes["submit-button"]}
          onClick={submitHandler}
          type={"submit"}
          variant="outlined"
        >
          Внести изменения
        </Button>
      </form>
    </BasicModal>
  );
};

export default EditModal;
