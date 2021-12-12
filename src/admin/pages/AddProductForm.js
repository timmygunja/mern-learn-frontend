import { Button, Card, TextField } from "@material-ui/core";
import { useRef } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import classes from "./AddProductForm.module.css";

const AddProductForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const nameRef = useRef("");
  const firmRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  // const sizeRef = useRef("");
  // const quantityRef = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/products",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          name: nameRef.current.value,
          firm: firmRef.current.value,
          description: descriptionRef.current.value,
          price: priceRef.current.value,
        })
      );
      window.alert("successful")
    } catch (err) {}
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}
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
          {/* <TextField
          className={classes["size-input"]}
          label="Size"
          variant="outlined"
          inputRef={sizeRef}
        />
        <TextField
          className={classes["quantity-input"]}
          label="Quantity"
          variant="outlined"
          inputRef={quantityRef}
        /> */}
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
